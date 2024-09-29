<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCryptoCurrencyStore } from "@/stores/useCryptoCurrencyStore";
import type { CryptoCurrency } from "@/types/CoinMarketCap/CryptoCurrency";
import LineCryptoChat from "@/components/LineCryptoChat.vue";

const route = useRoute();
const crypto = String(route.params.crypto);
const cryptoCurrencyStore = useCryptoCurrencyStore();
const cryptoData = ref<CryptoCurrency | null>(null);
const error = ref<boolean>(false);

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

document.title = `${capitalizeFirstLetter(crypto)} | NEI Market Analytics`;

onMounted(async () => {
    cryptoData.value = cryptoCurrencyStore.detailCryptoCurrencyByName(crypto);
});
</script>

<template>
    <main class="container justify-center">
        <LineCryptoChat />
        <ul v-if="!error">
            <li v-for="(data, index) in cryptoData" :key="index">
                {{ data }}
            </li>
        </ul>
        <div v-else>
            <h1>Not Found</h1>
            <p>The requested cryptocurrency could not be found.</p>
        </div>
    </main>
</template>
