<script setup lang="ts">
import AreaChart, {type AreaChartData} from "@/components/Chart/AreaChart.vue";
import AreaChartSkeleton from "@/components/Skeletons/components/Chart/AreaChart.vue";
import BarChart, {type BarChartData} from "@/components/Chart/BarChart.vue";
import BarChartSkeleton from "@/components/Skeletons/components/Chart/BarChart.vue";
import LineChart, {type LineChartData} from "@/components/Chart/LineChart.vue";
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

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedBarData = ref<BarChartData[]>([]);
const treatedAreaData = ref<AreaChartData[]>([]);
const treatedLineData = ref<LineChartData[]>([]);

function mapToTreatedBarData(detailedStock: DetailedStock): BarChartData[] {
	return detailedStock.historicalDataPrice.map((data) => ({
		High: numberFormatter(data.high),
		Low: numberFormatter(data.low),
		name: capitalizeFirstLetter(transformDate(data.date)),
	}));
}

function mapToTreatedAreaData(detailedStock: DetailedStock): AreaChartData[] {
	return detailedStock.historicalDataPrice.map((data) => ({
		Open: numberFormatter(data.open),
		Close: numberFormatter(data.close),
		name: capitalizeFirstLetter(transformDate(data.date)),
	}));
}

function mapToTreatedLineData(detailedStock: DetailedStock): LineChartData[] {
	return detailedStock.historicalDataPrice.map((data) => ({
		Volume: data.volume,
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
		}
	}

	const detailedStock = stocksCurrencyStore.getDetailedStock(ticker) as DetailedStock;

	treatedBarData.value = mapToTreatedBarData(detailedStock);
	treatedAreaData.value = mapToTreatedAreaData(detailedStock);
	treatedLineData.value = mapToTreatedLineData(detailedStock);

	loading.value = false;
});
</script>


<template>
    <section class="container justify-center mb-9">
        <ul class="flex flex-col gap-20 w-full text-center">
            <li>
                <BarChart v-if="!loading && !error" :title="ticker" :data="treatedBarData" />
                <BarChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <AreaChart v-if="!loading" :title="ticker" :data="treatedAreaData" />
                <AreaChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <LineChart v-if="!loading" :title="ticker" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>
