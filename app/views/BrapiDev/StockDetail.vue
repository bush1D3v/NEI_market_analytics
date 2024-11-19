<script setup lang="ts">
import { stockDetail } from "@/services/BrapiDev";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

onBeforeMount(() => {
    document.title = `${capitalizeFirstLetter(ticker)} | NEI Market Analytics`;
});

onMounted(async () => {
    if (!stocksCurrencyStore.getDetailedStock(ticker)) {
        try {
            await stockDetail(ticker);
        } catch (err) {
            error.value = true;
        }
    }

    loading.value = false;
});
</script>


<template>
    <section class="container justify-center">
        <h1 class="hover:underline hover:opacity-50 ease-in-out duration-150">oi</h1>
    </section>
</template>
