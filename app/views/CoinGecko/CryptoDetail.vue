<script setup lang="ts">
import AreaChart from "@/components/Chart/AreaChart.vue";
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
import type {CryptoDetail, GeneralData} from "@/types/CoinGecko/CryptoDetail";
import type {ChartData} from "@/components/Chart/types/ChartData";

const route = useRoute();
const crypto = String(route.params.crypto);
const cryptoCurrencyStore = useCryptoCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedLineData = ref<ChartData[]>([]);
const treatedBarData = ref<ChartData[]>([]);
const treatedAreaData = ref<ChartData[]>([]);

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

function filterCryptoDetail(cryptoDetail: CryptoDetail): CryptoDetail {
	const filteredPrices = filterByDay(cryptoDetail.prices);
	const filteredMarketCaps = filterByDay(cryptoDetail.market_caps);
	const filteredTotalVolumes = filterByDay(cryptoDetail.total_volumes);

	// Gamb pra contornar o filtro que retorna 2 itens da mesma data no inicio do array
	return {
		prices: filteredPrices.slice(1),
		market_caps: filteredMarketCaps.slice(1),
		total_volumes: filteredTotalVolumes.slice(1),
	};
}

function mapToTreatedBarData(detailedCrypto: CryptoDetail): ChartData[] {
	const locale = navigator.language;
	return detailedCrypto.prices.map((data) => ({
		dynamicParams: ["Price"],
		chartData: [data[1]],
		name: capitalizeFirstLetter(
			new Date(data[0]).toLocaleDateString(locale, {day: "numeric", month: "short"}),
		),
	}));
}

function mapToTreatedLineData(detailedCrypto: CryptoDetail): ChartData[] {
	const locale = navigator.language;
	return detailedCrypto.total_volumes.map((data) => ({
		dynamicParams: ["Volume"],
		chartData: [data[1]],
		name: capitalizeFirstLetter(
			new Date(data[0]).toLocaleDateString(locale, {day: "numeric", month: "short"}),
		),
	}));
}

function mapToTreatedAreaData(detailedCrypto: CryptoDetail): ChartData[] {
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
		}
	}

	const currency = cryptoCurrencyStore.getCryptoDetail(crypto);

	const filteredCrypto = filterCryptoDetail(currency as CryptoDetail);

	cryptoCurrencyStore.setCryptoDetail(crypto, filteredCrypto);

	treatedLineData.value = mapToTreatedLineData(
		cryptoCurrencyStore.getCryptoDetail(crypto) as CryptoDetail,
	);
	treatedBarData.value = mapToTreatedBarData(
		cryptoCurrencyStore.getCryptoDetail(crypto) as CryptoDetail,
	);
	treatedAreaData.value = mapToTreatedAreaData(
		cryptoCurrencyStore.getCryptoDetail(crypto) as CryptoDetail,
	);

	loading.value = false;
});
</script>

<template>
    <section class="container justify-center mb-9">
        <ul class="flex flex-col gap-20 w-full text-center">
            <li>
                <h2>{{ crypto }}</h2>
                <BarChart v-if="!loading && !error" :title="crypto" :data="treatedBarData" />
                <BarChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2>{{ crypto }}</h2>
                <AreaChart v-if="!loading && !error" :title="crypto" :data="treatedAreaData" />
                <AreaChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2>{{ crypto }}</h2>
                <LineChart v-if="!loading && !error" :title="crypto" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>
