<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import EntityCardSkeleton from "@/components/Skeletons/components/EntityCard.vue";
import EntityCard from "@/components/EntityCard.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import {ref, onMounted} from "vue";
import {listStocks} from "@/services/BrapiDev";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";

const {stocksCurrencies} = useStocksCurrencyStore();
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

	try {
		await loadStocks();
	} catch (err) {
		error.value = true;
	}

	isLoadingMore.value = false;
}

onMounted(async () => {
	if (!stocksCurrencies.length) {
		try {
			await loadStocks();
		} catch (err) {
			error.value = true;
		}
	}
	isLoading.value = false;
});
</script>

<template>
    <section class="container justify-center my-4">
        <ul v-if="!error" class="flex gap-4 flex-wrap justify-center">
            <li v-if="!isLoading" v-for="(stockCurrency, index) in stocksCurrencies" :key="index">
                <EntityCard type="stock" :image="stockCurrency.logo" :name="stockCurrency.name" :symbol="stockCurrency.stock"
                    :id="stockCurrency.type" :circulating_supply="stockCurrency.volume" :price="stockCurrency.close"
                    :market_cap="stockCurrency.market_cap || 0" :router-link-to="`/stocks/${stockCurrency.stock}`" />
            </li>
            <EntityCardSkeleton v-else v-for="i in 12" :key="i" />
        </ul>
        <div v-if="!error && !isLoading" class="flex justify-center mt-4">
            <Button v-translate @click="loadMore" :disabled="isLoadingMore">
                {{ isLoadingMore ? 'Carregando...' : 'Carregar Mais' }}
            </Button>
        </div>
        <InternalServerError v-if="error" />
    </section>
</template>
