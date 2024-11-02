<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
// import Skeleton from "@/components/Skeletons/views/Cryptos.vue";
import EntityCard from "@/components/EntityCard.vue";
import {ref, onMounted} from "vue";
import {listStocks} from "@/services/BrapiDev";
import {useTranslation} from "@/config/composable/translate";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";

useTranslation();

const stocksCurrencyStore = useStocksCurrencyStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const start = ref<number>(1);

async function loadStocks() {
	// return (await listStocks(12, start.value)) ?? [];
    const response = await listStocks(12, start.value);
    console.log('response', response);

}

async function loadMore() {
	isLoadingMore.value = true;
	start.value += 12;
	const newStocks = await loadStocks();
	stocksCurrencyStore.addStocksCurrencies(newStocks);
	isLoadingMore.value = false;
}

onMounted(async () => {
	if (!stocksCurrencyStore.stocksCurrencies.length) {
		stocksCurrencyStore.addStocksCurrencies(await loadStocks());
	}
	isLoading.value = false;
});
</script>

<template>
    <main class="container justify-center my-4">
        <ul class="grid grid-cols-3 gap-4">
            <li
                v-if="!isLoading"
                v-for="stockCurrency in stocksCurrencyStore.stocksCurrencies"
                :key="stockCurrency.id"
            >
                <EntityCard
                    :image="stockCurrency.logourl"
                    :name="stockCurrency.longName"
                    :symbol="stockCurrency.shortName"
                    :router-link-to="`/stocks/${stockCurrency.symbol}`"                />
                <!-- <Skeleton v-else v-for="i in 12" :key="i" /> -->
            </li>
        </ul>

        <div class="flex justify-center mt-4">
            <Button @click="loadMore" :disabled="isLoadingMore">
                {{ isLoadingMore ? "Carregando..." : "Carregar Mais" }}
            </Button>
        </div>

    </main>
</template>

<style scoped>
p {
    @apply text-destructive;
}
</style>
