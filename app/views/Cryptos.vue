<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Skeleton from "@/components/Skeletons/views/Cryptos.vue";
import EntityCard from "@/components/EntityCard.vue";
import InternalServerError from "@/views/InternalServerError.vue";
import { ref, onMounted } from "vue";
import { listBitcoin } from "@/services/CoinMarketCap";
import { useTranslation } from "@/config/composable/translate";
import { useCryptoCurrencyStore } from "@/stores/useCryptoCurrencyStore";

useTranslation();

const cryptoCurrencyStore = useCryptoCurrencyStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const start = ref<number>(1);
const error = ref<boolean>(false);

async function loadCryptos() {
    return await listBitcoin(12, start.value);
}

async function loadMore() {
    isLoadingMore.value = true;
    start.value += 12;
    const newCryptos = await loadCryptos();

    if (newCryptos) {
        cryptoCurrencyStore.addCryptoCurrencies(newCryptos);
    } else {
        error.value = true;
    }

    isLoadingMore.value = false;
}

onMounted(async () => {
    if (!cryptoCurrencyStore.cryptoCurrencies.length) {
        const data = await loadCryptos();
        if (!data) error.value = true;
        else cryptoCurrencyStore.addCryptoCurrencies(data);
    }
    isLoading.value = false;
});
</script>

<template>
    <main class="container justify-center my-4">
        <ul v-if="!error" class="grid grid-cols-3 gap-4">
            <li v-if="!isLoading" v-for="cryptoCurrency in cryptoCurrencyStore.cryptoCurrencies"
                :key="cryptoCurrency.id">
                <EntityCard :image="`https://s2.coinmarketcap.com/static/img/coins/64x64/${cryptoCurrency.id}.png`"
                    :name="cryptoCurrency.name" :symbol="cryptoCurrency.symbol" :id="cryptoCurrency.id"
                    :circulating_supply="cryptoCurrency.circulating_supply" :price="cryptoCurrency.quote.USD.price"
                    :market_cap="cryptoCurrency.quote.USD.market_cap"
                    :router-link-to="`/cryptos/${cryptoCurrency.name}`" />
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
