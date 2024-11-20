<script setup lang="ts">
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCryptoCurrencyStore } from "@/stores/useCryptoCurrencyStore";
import type { CryptoCurrency } from "@/types/CoinMarketCap/CryptoCurrency";
import { detailBitcoin } from "@/services/CoinMarketCap";

const route = useRoute();
const crypto = String(route.params.crypto);
const { detailCryptoCurrencyByName } = useCryptoCurrencyStore();
const cryptoData = ref<CryptoCurrency | null>(null);
const error = ref<boolean>(false);
const loading = ref<boolean>(true);

onBeforeMount(() => {
    document.title = `${capitalizeFirstLetter(crypto)} | NEI Market Analytics`;
});

onMounted(async () => {
    cryptoData.value = detailCryptoCurrencyByName(crypto);

    if (!cryptoData.value) {
        try {
            cryptoData.value = (await detailBitcoin(crypto.toLowerCase())) as CryptoCurrency;
        } catch (err) {
            error.value = true;
        }
    }

    loading.value = false;
});
</script>

<template>
    <section v-if="!loading" class="container justify-center">
        <ul v-if="!error">
            <li v-for="(data, index) in cryptoData" :key="index">
                {{ data }}
            </li>
        </ul>
        <div v-else>
            <h1>Not Found</h1>
            <p>The requested cryptocurrency could not be found.</p>
        </div>
    </section>

</template>
