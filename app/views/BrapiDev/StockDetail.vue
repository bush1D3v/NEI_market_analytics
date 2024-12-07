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
import transformDate from "@/utils/transformDate";
import type { DetailedStock } from "@/types/BrapiDev/DetailedStock";
import { stockDetail } from "@/services/BrapiDev";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { ChartData } from "@/components/Chart/types/ChartData";

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedBarData = ref<ChartData[]>([]);
const treatedAreaData = ref<ChartData[]>([]);
const treatedLineData = ref<ChartData[]>([]);

function mapToTreatedBarData(detailedStock: DetailedStock): ChartData[] {
    return detailedStock.historicalDataPrice.map((data) => ({
        dynamicParams: [ "High", "Low" ],
        chartData: [ numberFormatter(data.high), numberFormatter(data.low) ],
        name: capitalizeFirstLetter(transformDate(data.date)),
    }));
}

function mapToTreatedAreaData(detailedStock: DetailedStock): ChartData[] {
    return detailedStock.historicalDataPrice.map((data) => ({
        dynamicParams: [ "Open", "Close" ],
        chartData: [ numberFormatter(data.open), numberFormatter(data.close) ],
        name: capitalizeFirstLetter(transformDate(data.date)),
    }));
}

function mapToTreatedLineData(detailedStock: DetailedStock): ChartData[] {
    return detailedStock.historicalDataPrice.map((data) => ({
        dynamicParams: [ "Volume" ],
        chartData: [ data.volume ],
        name: capitalizeFirstLetter(transformDate(data.date)),
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
                <h2> {{ ticker }} </h2>
                <BarChart v-if="!loading && !error" :title="ticker" :data="treatedBarData" />
                <BarChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2> {{ ticker }} </h2>
                <AreaChart v-if="!loading" :title="ticker" :data="treatedAreaData" />
                <AreaChartSkeleton v-if="loading && !error" />
            </li>
            <li>
                <h2> {{ ticker }} </h2>
                <LineChart v-if="!loading" :title="ticker" :data="treatedLineData" />
                <LineChartSkeleton v-if="loading && !error" />
            </li>
        </ul>
        <InternalServerError v-if="error" />
    </section>
</template>
