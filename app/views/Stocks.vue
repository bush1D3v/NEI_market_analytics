<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Skeleton from "@/components/Skeletons/views/Cryptos.vue";
import EntityCard from "@/components/EntityCard.vue";
import InternalServerError from "@/views/InternalServerError.vue";
import { ref, onMounted } from "vue";
import { listStocks } from "@/services/BrapiDev";
import { useTranslation } from "@/config/composable/translate";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";

useTranslation();

const stockCurrencyStore = useStocksCurrencyStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const start = ref<number>(1);
const error = ref<boolean>(false);

async function loadStocks() {
    return await listStocks(12, start.value);
}

async function loadMore() {
    isLoadingMore.value = true;
    start.value += 12;
    const newStocks = await loadStocks();

    if (newStocks) {
        stockCurrencyStore.addStocksCurrencies(newStocks);
    } else {
        error.value = true;
    }

    isLoadingMore.value = false;
}

onMounted(async () => {
    if (!stockCurrencyStore.stocksCurrencies.length) {
        const data = await loadStocks();
        if (!data) error.value = true;
        else stockCurrencyStore.addStocksCurrencies(data);
    }
    isLoading.value = false;
});
</script>

<template>
    <main class="container justify-center my-4">
        <ul v-if="!error" class="grid grid-cols-3 gap-4">
            <li v-if="!isLoading" v-for="(stockCurrency, index) in stockCurrencyStore.stocksCurrencies" :key="index">
                <EntityCard :image="stockCurrency.logo" :name="stockCurrency.name" :symbol="stockCurrency.stock"
                    :id="index" :circulating_supply="stockCurrency.change" :price="stockCurrency.close"
                    :market_cap="stockCurrency.market_cap || 0" :router-link-to="`/stocks/${stockCurrency.name}`" />
            </li>
            <Skeleton v-else v-for="i in 12" :key="i" />
        </ul>
        <div v-if="!error && !isLoading" class="flex justify-center mt-4">
            <Button @click="loadMore" :disabled="isLoadingMore">
                {{ isLoadingMore ? 'Carregando...' : 'Carregar Mais' }}
            </Button>
        </div>
        <InternalServerError v-if="error" />
    </main>
</template>
