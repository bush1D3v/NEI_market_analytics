<script setup lang="ts">
import LineChart, {type LineChartData} from "@/components/Chart/LineChart.vue";
import LineChartSkeleton from "@/components/Skeletons/components/Chart/LineChart.vue";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import {detailCrypto} from "@/services/CoinGecko";
import type {CryptoDetail, GeneralData} from "@/types/CoinGecko/CryptoDetail";

const route = useRoute();
const crypto = String(route.params.crypto);
const cryptoCurrencyStore = useCryptoCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedLineData = ref<LineChartData[]>([]);

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

function mapToTreatedLineData(detailedCrypto: CryptoDetail): LineChartData[] {
	const locale = navigator.language;
	return detailedCrypto.total_volumes.map((data) => ({
		Volume: data[1],
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

	loading.value = false;
});
</script>

<template>
    <section class="container justify-center mb-9">
        <ul class="flex flex-col gap-20 w-full text-center">
            <li>
                <LineChart v-if="!loading && !error" :title="crypto" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>
