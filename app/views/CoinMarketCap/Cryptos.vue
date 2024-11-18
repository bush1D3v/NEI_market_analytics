<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import EntityCardSkeleton from "@/components/Skeletons/components/EntityCard.vue";
import EntityCard from "@/components/EntityCard.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import {ref, onMounted} from "vue";
import {listCryptos} from "@/services/CoinMarketCap";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import {t} from "i18next";

const {cryptoCurrencies} = useCryptoCurrencyStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const start = ref<number>(1);
const error = ref<boolean>(false);

async function loadCryptos() {
	return await listCryptos(12, start.value);
}

async function loadMore() {
	isLoadingMore.value = true;
	start.value += 12;
	const newCryptos = await loadCryptos();

	if (!newCryptos) {
		error.value = true;
	}

	isLoadingMore.value = false;
}

onMounted(async () => {
	if (!cryptoCurrencies.length) {
		const data = await loadCryptos();
		if (!data) error.value = true;
	}
	isLoading.value = false;
});
</script>

<template>
    <section class="container justify-center my-4">
        <ul v-if="!error" class="flex gap-4 flex-wrap justify-center">
            <li v-if="!isLoading" v-for="cryptoCurrency in cryptoCurrencies" :key="cryptoCurrency.id">
                <EntityCard :image="`https://s2.coinmarketcap.com/static/img/coins/64x64/${cryptoCurrency.id}.png`"
                    :name="cryptoCurrency.name" :symbol="cryptoCurrency.symbol" :id="cryptoCurrency.id"
                    :circulating_supply="cryptoCurrency.circulating_supply" :price="cryptoCurrency.quote.USD.price"
                    :market_cap="cryptoCurrency.quote.USD.market_cap"
                    :router-link-to="`/cryptos/${cryptoCurrency.name}`" />
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
