<script setup lang="ts">
import RouterLink from "@/tags/RouterLink.vue";
import Button from "@/components/ui/button/Button.vue";
import { useTranslation } from "@/config/composable/translate";
import { onBeforeMount } from "vue";
import { listBitcoin } from "@/services/CoinMarketCap";
import { useCryptoCurrencyStore } from "@/stores/useCryptoCurrencyStore";
import { listCompanyNews } from "@/services/Finnhub";
import { useNewsStore } from "@/stores/useNewsStore";
import { listStocks } from "@/services/BrapiDev";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";

const cryptoCurrencyStore = useCryptoCurrencyStore();
const newsStore = useNewsStore();
const stocksCurrencyStore = useStocksCurrencyStore();

useTranslation();

onBeforeMount(async () => {
    await listBitcoin(5, 1, "percent_change_24h");
    await listCompanyNews();
    await listStocks(5, 1, "change", "desc");
})
</script>

<template>
    <section class="container justify-center">
        <RouterLink to="/news">
            <Button>
                News
            </Button>
        </RouterLink>
    </section>
</template>
