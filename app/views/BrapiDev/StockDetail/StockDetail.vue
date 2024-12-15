<script setup lang="ts">
import AreaChart from "@/components/Chart/AreaChart.vue";
import AreaChartSkeleton from "@/components/Skeletons/components/Chart/AreaChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import BarChartSkeleton from "@/components/Skeletons/components/Chart/BarChart.vue";
import LineChart from "@/components/Chart/LineChart.vue";
import LineChartSkeleton from "@/components/Skeletons/components/Chart/LineChart.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import numberFormatter from "@/utils/numberFormatter";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import transformDate from "@/utils/transformDate";
import type {DetailedStock} from "@/types/BrapiDev/DetailedStock";
import {stockDetail} from "@/services/BrapiDev";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import type {ChartData} from "@/components/Chart/types/ChartData";
import Image from "@/tags/Image.vue";
import ValuesList from "./components/ValuesList.vue";
import Link from "@/tags/Link.vue";
import {HomeIcon} from "@radix-icons/vue";
import StockProfile from "./components/StockProfile.vue";
import ArticleSkeleton from "@/components/Skeletons/components/views/BrapiDev/StockDetail/ArticleDescription.vue";

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedBarData = ref<ChartData[]>([]);
const treatedAreaData = ref<ChartData[]>([]);
const treatedLineData = ref<ChartData[]>([]);
const stockDetailData = ref<DetailedStock>();

function mapToTreatedBarData(detailedStock: DetailedStock): ChartData[] {
	return detailedStock.historicalDataPrice.map((data) => ({
		dynamicParams: ["High", "Low"],
		chartData: [numberFormatter(data.high), numberFormatter(data.low)],
		name: capitalizeFirstLetter(transformDate(data.date)),
	}));
}

function mapToTreatedAreaData(detailedStock: DetailedStock): ChartData[] {
	return detailedStock.historicalDataPrice.map((data) => ({
		dynamicParams: ["Open", "Close"],
		chartData: [numberFormatter(data.open), numberFormatter(data.close)],
		name: capitalizeFirstLetter(transformDate(data.date)),
	}));
}

function mapToTreatedLineData(detailedStock: DetailedStock): ChartData[] {
	return detailedStock.historicalDataPrice.map((data) => ({
		dynamicParams: ["Volume"],
		chartData: [data.volume],
		name: capitalizeFirstLetter(transformDate(data.date)),
	}));
}

onBeforeMount(() => {
	document.title = `${capitalizeFirstLetter(ticker)} | NEI Market Analytics`;
});

onMounted(async () => {
	if (!stocksCurrencyStore.getDetailedStock(ticker)) {
		try {
			await stockDetail(ticker);
		} catch (err) {
			error.value = true;
			loading.value = false;
			return;
		}
	}

	const detailedStock = stocksCurrencyStore.getDetailedStock(ticker) as DetailedStock;

	stockDetailData.value = detailedStock;

	treatedBarData.value = mapToTreatedBarData(detailedStock);
	treatedAreaData.value = mapToTreatedAreaData(detailedStock);
	treatedLineData.value = mapToTreatedLineData(detailedStock);

	loading.value = false;
});
</script>

<template>
    <section class="container justify-center mb-9">
        <article v-if="!loading && !error" class="flex flex-col gap-4 w-full">
            <div class="flex flex-col items-center md:flex-row justify-between gap-4">
                <div class="flex flex-col md:flex-row justify-between gap-2 w-full">
                    <div class="flex flex-col items-start gap-2">
                        <div class="flex items-end gap-2">
                            <Image :src="stockDetailData?.logourl || ''" :alt="`${stockDetailData?.shortName || stockDetailData?.longName || stockDetailData?.symbol} Logo`" width="50" height="50" class="rounded-full" />
                            <h1>{{ stockDetailData?.shortName || stockDetailData?.longName || '' }}</h1>
                            <h2>- {{ stockDetailData?.symbol || '' }}</h2>
                        </div>
                        <Link v-if="stockDetailData?.summaryProfile?.website" :href="stockDetailData.summaryProfile.website" target="_blank" class="flex items-center gap-2 ml-1">
                            <HomeIcon class="w-5 h-5" />
                        </Link>
                    </div>
                    <ValuesList :data="stockDetailData" />
                </div>
            </div>
            <p v-if="stockDetailData?.summaryProfile?.longBusinessSummary" class="line-clamp-4 md:line-clamp-6 lg:line-clamp-none" v-html="stockDetailData.summaryProfile.longBusinessSummary" />
            <StockProfile :data="stockDetailData?.summaryProfile" />
        </article>
        <ArticleSkeleton v-if="loading && !error" />
        <ul v-if="!error" class="flex flex-col gap-20 w-full text-center mt-4">
            <li>
                <h2 v-translate>Valores Máximo e Mínimo do Dia</h2>
                <BarChart v-if="!loading && !error" :title="ticker" :data="treatedBarData" />
                <BarChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2 v-translate>Preço de Abertura e Fechamento</h2>
                <AreaChart v-if="!loading" :title="ticker" :data="treatedAreaData" />
                <AreaChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2 v-translate>Volume</h2>
                <LineChart v-if="!loading" :title="ticker" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>
