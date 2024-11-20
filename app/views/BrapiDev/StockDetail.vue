<script setup lang="ts">
import AreaChart from "@/components/Chart/AreaChart.vue";
import AreaChartSkeleton from "@/components/Skeletons/components/Chart/AreaChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import BarChartSkeleton from "@/components/Skeletons/components/Chart/BarChart.vue";
import LineChart from "@/components/Chart/LineChart.vue";
import LineChartSkeleton from "@/components/Skeletons/components/Chart/LineChart.vue";
import InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import numberFormatter from "@/utils/numberFormatter";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import type { DetailedStock } from "@/types/BrapiDev/DetailedStock";
import { stockDetail } from "@/services/BrapiDev";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

interface TreatedBarData {
    High: number | string;
    Low: number | string;
    name: string;
}

interface TreatedAreaData {
    Open: number | string;
    Close: number | string;
    name: string;
}

interface TreatedLineData {
    Volume: number | string;
    name: string;
}

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedBarData = ref<TreatedBarData[]>([]);
const treatedAreaData = ref<TreatedAreaData[]>([]);
const treatedLineData = ref<TreatedLineData[]>([]);

function mapToTreatedBarData(detailedStock: DetailedStock): TreatedBarData[] {
    const locale = navigator.language;
    return detailedStock.historicalDataPrice.map(data => ({
        High: numberFormatter(data.high),
        Low: numberFormatter(data.low),
        name: capitalizeFirstLetter(new Date(data.date * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'short' }))
    }));
}

function mapToTreatedAreaData(detailedStock: DetailedStock): TreatedAreaData[] {
    const locale = navigator.language;
    return detailedStock.historicalDataPrice.map(data => ({
        Open: numberFormatter(data.open),
        Close: numberFormatter(data.close),
        name: capitalizeFirstLetter(new Date(data.date * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'short' }))
    }));
}

function mapToTreatedLineData(detailedStock: DetailedStock): TreatedLineData[] {
    const locale = navigator.language;
    return detailedStock.historicalDataPrice.map(data => ({
        Volume: data.volume,
        name: capitalizeFirstLetter(new Date(data.date * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'short' }))
    }));
}

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

    const detailedStock = stocksCurrencyStore.getDetailedStock(ticker) as DetailedStock;

    treatedBarData.value = mapToTreatedBarData(detailedStock);
    treatedAreaData.value = mapToTreatedAreaData(detailedStock);
    treatedLineData.value = mapToTreatedLineData(detailedStock);

    loading.value = false;
});
</script>


<template>
    <section class="container justify-center mb-9">
        <ul class="flex flex-col gap-20 w-full text-center">
            <li>
                <BarChart v-if="!loading && !error" :title="ticker" :data="treatedBarData" />
                <BarChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <AreaChart v-if="!loading" :title="ticker" :data="treatedAreaData" />
                <AreaChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <LineChart v-if="!loading" :title="ticker" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>

<style lang="css" scoped></style>
