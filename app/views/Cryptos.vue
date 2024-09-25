<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { listBitcoin } from "@/services/CoinMarketCap";
import { useTranslation } from "@/config/composable/translate";
useTranslation();

const cryptoCurrencies = ref([]);

// onMounted(async () => {
// 	cryptoCurrencies.value = await listBitcoin();
// });
</script>

<template>
    <main class="container justify-center">
        <RouterLink to="/coins">
            <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">Vá para moedas globais</h1>
        </RouterLink>
        <!-- <ul>
            <li v-for="cryptoCurrency in cryptoCurrencies">
                <h2>{{ cryptoCurrency.name }}</h2>
            </li>
        </ul> -->
    </main>
</template>
