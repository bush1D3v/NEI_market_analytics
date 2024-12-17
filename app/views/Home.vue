<script setup lang="ts">
import HomeTable from "@/components/views/Home/HomeTable.vue";
import HomeTableSkeleton from "@/components/Skeletons/components/views/Home/HomeTable.vue";
import type {New} from "@/types/Finnhub/New";
import {onBeforeMount, ref} from "vue";
import {listCryptoCurrencies} from "@/services/CoinGecko";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import {listCompanyNews} from "@/services/Finnhub";
import {listStocks} from "@/services/BrapiDev";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";
import {useNewsStore} from "@/stores/useNewsStore";

const cryptoCurrencyStore = useCryptoCurrencyStore();
const newsStore = useNewsStore();
const stocksCurrencyStore = useStocksCurrencyStore();

const onCryptoLoading = ref<boolean>(false);
const onNewsLoading = ref<boolean>(false);
const onStocksLoading = ref<boolean>(false);

onBeforeMount(async () => {
	onNewsLoading.value = true;
	onCryptoLoading.value = true;
	onStocksLoading.value = true;

	if (!newsStore.news.company.length) {
		(await listCompanyNews()) as New[];
	}
	onNewsLoading.value = false;

	if (!cryptoCurrencyStore.homeCryptoCurrencies.length) {
		await listCryptoCurrencies(5, 1, "market_cap_desc", "24h");
	}
	onCryptoLoading.value = false;

	if (!stocksCurrencyStore.homeStockCurrencies.length) {
		await listStocks(5, 1, "change", "desc");
	}
	onStocksLoading.value = false;
});
</script>

<template>
    <section class="flex flex-col items-center justify-center gap-8">
        <ul class="flex gap-4 flex-wrap justify-center">
            <li v-if="!onCryptoLoading">
                <HomeTable icon="🪙" table-title="Moedas em alta" redirect-to="/cryptos"
                    :coins="cryptoCurrencyStore.homeCryptoCurrencies" />
            </li>
            <HomeTableSkeleton v-else type="cryptos" />
            <li v-if="!onStocksLoading">
                <HomeTable icon="📈" table-title="Ações em Alta" redirect-to="/stocks"
                    :stocks="stocksCurrencyStore.homeStockCurrencies" />
            </li>
            <HomeTableSkeleton v-else type="stocks" />
            <li v-if="!onNewsLoading">
                <HomeTable icon="📰" table-title="Do nosso Blog" redirect-to="/news"
                    :news="newsStore.news.company.slice(0, 3)" />
            </li>
            <HomeTableSkeleton v-else type="news" />
        </ul>
    </section>
</template>
