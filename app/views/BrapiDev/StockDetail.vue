<script setup lang="ts">
import BarChart from "@/components/Chart/BarChart.vue";
import BarChartSkeleton from "@/components/Skeletons/components/Chart/BarChart.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import numberFormatter from "@/utils/numberFormatter";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import type { DetailedStock } from "@/types/BrapiDev/DetailedStock";
import { stockDetail } from "@/services/BrapiDev";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

interface TreatedData {
    High: number | string;
    Low: number | string;
    name: string;
}

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedData = ref<TreatedData[]>([]);

function mapToTreatedData(detailedStock: DetailedStock): TreatedData[] {
    const locale = navigator.language;
    return detailedStock.historicalDataPrice.map(data => ({
        High: numberFormatter(data.high),
        Low: numberFormatter(data.low),
        name: capitalizeFirstLetter(new Date(data.date * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'short' }))
    }));
}

onBeforeMount(() => {
    document.title = `${capitalizeFirstLetter(ticker)} | NEI Market Analytics`;
});

onMounted(async () => {
    if (!stocksCurrencyStore.getDetailedStock(ticker)) {
        try {
            let response: DetailedStock;
            do {
                response = await stockDetail(ticker) as DetailedStock;
            } while (response.historicalDataPrice.length === 0);
        } catch (err) {
            error.value = true;
        }
    }

    treatedData.value = mapToTreatedData(stocksCurrencyStore.getDetailedStock(ticker) as DetailedStock);

    loading.value = false;
});
</script>


<template>
    <section class="container justify-center">
        <BarChart v-if="!loading" :title="ticker" :data="treatedData" />
        <BarChartSkeleton v-else />
        <InternalServerError v-if="error" />
    </section>
</template>
