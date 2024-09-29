<script setup lang="ts">
import Image from "@/tags/Image.vue";
import Button from "@/components/ui/button/Button.vue";
import { ref, onMounted } from "vue";
import { listBitcoin } from "@/services/CoinMarketCap";
import { useTranslation } from "@/config/composable/translate";
import Skeleton from "@/components/Skeletons/views/Cryptos.vue";
import { useCryptoCurrencyStore } from "@/stores/useCryptoCurrencyStore";
import numberFormatter from "@/utils/numberFormatter";

useTranslation();

const cryptoCurrencyStore = useCryptoCurrencyStore();
const isLoading = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const start = ref<number>(1);

async function loadCryptos() {
    return await listBitcoin(12, start.value) ?? [];
}

async function loadMore() {
    isLoadingMore.value = true;
    start.value += 12;
    const newCryptos = await loadCryptos();
    cryptoCurrencyStore.addCryptoCurrencies(newCryptos);
    isLoadingMore.value = false;
}

onMounted(async () => {
    if (!cryptoCurrencyStore.cryptoCurrencies.length) {
        cryptoCurrencyStore.addCryptoCurrencies(await loadCryptos());
    }
    isLoading.value = false;
});
</script>

<template>
    <main class="container justify-center my-4">
        <ul class="grid grid-cols-3 gap-4">
            <li v-if="!isLoading" v-for="cryptoCurrency in cryptoCurrencyStore.cryptoCurrencies"
                :key="cryptoCurrency.id" class="flex flex-col bg-secondaryDarker gap-4 p-5 rounded-lg min-w-96">
                <div class="flex gap-4 items-center">
                    <Image :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${cryptoCurrency.id}.png`"
                        :alt="cryptoCurrency.name + ' logo'" width="50" height="50" class="rounded-full" />
                    <div class="flex flex-col">
                        <h3 class="line-clamp-1 max-w-56">{{ cryptoCurrency.name }}</h3>
                        <div class="flex gap-[6px]">
                            <p>Currency</p>
                            <strong>{{ cryptoCurrency.symbol }}</strong>
                            <p>&nbsp;·&nbsp; Chain ID</p>
                            <strong>{{ cryptoCurrency.id }}</strong>
                        </div>
                    </div>
                </div>
                <hr class="h-[1px] w-full" />
                <h6 v-translate>Estatísticas</h6>
                <div class="font-semibold flex justify-between">
                    <div>
                        <strong>${{ numberFormatter(cryptoCurrency.quote.USD.price) }}</strong>
                        <p>Preço</p>
                    </div>
                    <div>
                        <strong>{{ numberFormatter(cryptoCurrency.quote.USD.market_cap) }}</strong>
                        <p>Capitalização de mercado</p>
                    </div>
                    <div>
                        <strong>{{ numberFormatter(cryptoCurrency.circulating_supply) }}</strong>
                        <p>Volume</p>
                    </div>
                </div>
                <RouterLink :to="`/cryptos/${cryptoCurrency.name}`">
                    <Button class="w-full">Explore {{ cryptoCurrency.name }}</Button>
                </RouterLink>
            </li>
            <Skeleton v-else v-for="i in 12" :key="i" />
        </ul>
        <div class="flex justify-center mt-4">
            <Button @click="loadMore" :disabled="isLoadingMore">
                {{ isLoadingMore ? 'Carregando...' : 'Carregar Mais' }}
            </Button>
        </div>
    </main>
</template>

<style scoped>
p {
    @apply text-destructive;
}
</style>
