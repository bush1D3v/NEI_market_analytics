<script setup lang="ts">
import RouterLink from "@/tags/RouterLink.vue";
import Button from "@/components/ui/button/Button.vue";
import HomeTable from "@/components/HomeTable.vue";
import HomeTableSkeleton from "@/components/Skeletons/components/HomeTable.vue";
import type {New} from "@/types/Finnhub/New";
import {onBeforeMount, ref} from "vue";
import {useTranslation} from "@/config/composable/translate";
import {listCryptos} from "@/services/CoinMarketCap";
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

useTranslation();

onBeforeMount(async () => {
	onNewsLoading.value = true;
	onCryptoLoading.value = true;
	onStocksLoading.value = true;

	if (!newsStore.news.company.length) {
		(await listCompanyNews()) as New[];
	}
	onNewsLoading.value = false;

	if (!cryptoCurrencyStore.homeCryptoCurrencies.length) {
		await listCryptos(5, 1, "percent_change_24h");
	}
	onCryptoLoading.value = false;

	if (!stocksCurrencyStore.homeStockCurrencies.length) {
		await listStocks(5, 1, "change", "desc");
	}
	onStocksLoading.value = false;
});
</script>

<template>
    <section class="container justify-center gap-8">
        <ul class="flex gap-4 flex-wrap justify-center">
            <li v-if="!onCryptoLoading">
                <HomeTable icon="🪙" table-title="Trending Coins" redirect-to="/cryptos"
                    :coins="cryptoCurrencyStore.homeCryptoCurrencies" />
            </li>
            <HomeTableSkeleton v-else type="cryptos" />
            <li v-if="!onStocksLoading">
                <HomeTable icon="📈" table-title="Trending Stocks" redirect-to="/stocks"
                    :stocks="stocksCurrencyStore.homeStockCurrencies" />
            </li>
            <HomeTableSkeleton v-else type="stocks" />
            <li v-if="!onNewsLoading">
                <HomeTable icon="📰" table-title="From Our Blog" redirect-to="/news"
                    :news="newsStore.news.company.slice(0, 3)" />
            </li>
            <HomeTableSkeleton v-else type="news" />
        </ul>
        <RouterLink to="/news">
            <Button>
                News
            </Button>
        </RouterLink>
    </section>
</template>
