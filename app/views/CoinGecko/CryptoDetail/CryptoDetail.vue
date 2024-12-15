<script setup lang="ts">
import AreaChart from "@/components/Chart/AreaChart.vue";
import ArticleSkeleton from "@/components/Skeletons/components/views/CoinGecko/CryptoDetail/ArticleDescription.vue";
import AreaChartSkeleton from "@/components/Skeletons/components/Chart/AreaChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import BarChartSkeleton from "@/components/Skeletons/components/Chart/BarChart.vue";
import LineChart from "@/components/Chart/LineChart.vue";
import LineChartSkeleton from "@/components/Skeletons/components/Chart/LineChart.vue";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import {detailCrypto} from "@/services/CoinGecko";
import type {
	CryptoGraphDetail,
	GeneralData,
	CryptoCompleted,
	CryptoDataDescription,
} from "@/types/CoinGecko/CryptoDetail";
import type {ChartData} from "@/components/Chart/types/ChartData";
import {useTranslation} from "@/config/composable/translate";
import Image from "@/tags/Image.vue";
import LinksList from "./components/LinksList.vue";
import ValuesList from "./components/ValuesList.vue";

useTranslation();

const route = useRoute();
const crypto = String(route.params.crypto);
const cryptoCurrencyStore = useCryptoCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedLineData = ref<ChartData[]>([]);
const treatedBarData = ref<ChartData[]>([]);
const treatedAreaData = ref<ChartData[]>([]);
const cryptoDetailData = ref<CryptoDataDescription>();

function filterByDay(data: GeneralData[]): GeneralData[] {
	const seenDates = new Set<string>();
	return data.filter(([timestamp]) => {
		const date = new Date(timestamp).toISOString().split("T")[0];
		if (seenDates.has(date)) {
			return false;
		}
		seenDates.add(date);
		return true;
	});
}

async function filterCryptoDetail(cryptoDetail: CryptoCompleted): Promise<CryptoCompleted> {
	const filteredPrices = filterByDay(cryptoDetail.prices);
	const filteredMarketCaps = filterByDay(cryptoDetail.market_caps);
	const filteredTotalVolumes = filterByDay(cryptoDetail.total_volumes);

	cryptoDetailData.value = cryptoDetail.description;

	// Gamb pra contornar o filtro que retorna 2 itens da mesma data no inicio do array
	return {
		prices: filteredPrices.slice(1),
		market_caps: filteredMarketCaps.slice(1),
		total_volumes: filteredTotalVolumes.slice(1),
		description: cryptoDetail.description,
	};
}

function mapToTreatedBarData(detailedCrypto: CryptoGraphDetail): ChartData[] {
	const locale = navigator.language;
	return detailedCrypto.prices.map((data) => ({
		dynamicParams: ["Price"],
		chartData: [data[1]],
		name: capitalizeFirstLetter(
			new Date(data[0]).toLocaleDateString(locale, {day: "numeric", month: "short"}),
		),
	}));
}

function mapToTreatedLineData(detailedCrypto: CryptoGraphDetail): ChartData[] {
	const locale = navigator.language;
	return detailedCrypto.total_volumes.map((data) => ({
		dynamicParams: ["Volume"],
		chartData: [data[1]],
		name: capitalizeFirstLetter(
			new Date(data[0]).toLocaleDateString(locale, {day: "numeric", month: "short"}),
		),
	}));
}

function mapToTreatedAreaData(detailedCrypto: CryptoGraphDetail): ChartData[] {
	const locale = navigator.language;
	return detailedCrypto.market_caps.map((data) => ({
		dynamicParams: ["Market"],
		chartData: [data[1]],
		name: capitalizeFirstLetter(
			new Date(data[0]).toLocaleDateString(locale, {day: "numeric", month: "short"}),
		),
	}));
}

onBeforeMount(() => {
	document.title = `${capitalizeFirstLetter(crypto)} | NEI Market Analytics`;
});

onMounted(async () => {
	if (!cryptoCurrencyStore.getCryptoDetail(crypto)) {
		try {
			await detailCrypto(crypto);
		} catch (err) {
			error.value = true;
			loading.value = false;
			return;
		}
	}

	const currency = cryptoCurrencyStore.getCryptoDetail(crypto);

	const filteredCrypto = await filterCryptoDetail(currency as CryptoCompleted);

	cryptoCurrencyStore.setCryptoDetail(crypto, filteredCrypto);

	treatedLineData.value = mapToTreatedLineData(
		cryptoCurrencyStore.getCryptoDetail(crypto) as CryptoGraphDetail,
	);
	treatedBarData.value = mapToTreatedBarData(
		cryptoCurrencyStore.getCryptoDetail(crypto) as CryptoGraphDetail,
	);
	treatedAreaData.value = mapToTreatedAreaData(
		cryptoCurrencyStore.getCryptoDetail(crypto) as CryptoGraphDetail,
	);

	loading.value = false;
});
</script>

<template>
    <section class="container justify-center mb-9">
        <article v-if="!loading && !error" class="flex flex-col gap-4">
            <div class="flex flex-col items-center md:flex-row justify-between gap-4">
                <div class="flex flex-col justify-between gap-2">
                    <div class="flex items-end gap-2">
                        <Image :src="cryptoDetailData?.image.small || ''" :alt="cryptoDetailData?.name + ' Logo' || ''" width="50" height="50" />
                        <h1>{{ cryptoDetailData?.name || '' }}</h1>
                        <h2>- {{ cryptoDetailData?.symbol || '' }}</h2>
                    </div>
                    <LinksList :links="cryptoDetailData?.links" />
                </div>
                <ValuesList :marketCapRank="cryptoDetailData?.market_cap_rank" :marketData="cryptoDetailData?.market_data" />
            </div>
            <p class="line-clamp-4 md:line-clamp-6 lg:line-clamp-none" v-html="cryptoDetailData?.description.en || 'Sem Descrição'"></p>
            <ul class="flex gap-2 items-center flex-wrap">
                <h4 v-translate>Categorias</h4>
                <li v-for="(item, index) in cryptoDetailData?.categories" :key="item">
                    <span>{{ item }}</span>
                    &nbsp;<span v-if="index < (cryptoDetailData?.categories.length || 0) - 1">|</span>
                </li>
            </ul>
        </article>
        <ArticleSkeleton v-if="loading && !error" />
        <ul v-if="!error" class="flex flex-col gap-20 w-full text-center mt-4">
            <li>
                <h2>Preço</h2>
                <BarChart v-if="!loading && !error" :title="crypto" :data="treatedBarData" />
                <BarChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2>Capitalização de Mercado</h2>
                <AreaChart v-if="!loading && !error" :title="crypto" :data="treatedAreaData" />
                <AreaChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2>Volume</h2>
                <LineChart v-if="!loading && !error" :title="crypto" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>
