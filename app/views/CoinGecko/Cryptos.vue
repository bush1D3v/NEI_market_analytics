<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import EntityCardSkeleton from "@/components/Skeletons/components/EntityCard.vue";
import EntityCard from "@/components/EntityCard.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import {ref, onMounted} from "vue";
import {listCryptoCurrencies} from "@/services/CoinGecko";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import {t} from "i18next";

const {cryptoCurrencies} = useCryptoCurrencyStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const page = ref<number>(1);
const error = ref<boolean>(false);

async function loadCryptos() {
	return await listCryptoCurrencies(12, page.value);
}

async function loadMore() {
	isLoadingMore.value = true;
	page.value++;
	const newCryptos = await loadCryptos();

	if (!newCryptos) {
		error.value = true;
	}

	isLoadingMore.value = false;
}

onMounted(async () => {
	if (!cryptoCurrencies.length) {
		try {
			await loadCryptos();
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
            <li v-if="!isLoading" v-for="data in cryptoCurrencies" :key="data.id">
                <EntityCard type="crypto" :image="data.image" :name="data.name" :symbol="data.symbol" :id="data.id"
                    :circulating_supply="data.circulating_supply" :price="data.current_price"
                    :market_cap="data.market_cap" :router-link-to="`/cryptos/${data.id}`" />
            </li>
            <EntityCardSkeleton v-else v-for="i in 12" :key="i" />
        </ul>
        <div v-if="!error && !isLoading" class="flex justify-center mt-4">
            <Button @click="loadMore" :disabled="isLoadingMore">
                {{ isLoadingMore ? t('Carregando...') : t('Carregar Mais') }}
            </Button>
        </div>
        <InternalServerError v-if="error" />
    </section>
</template>
