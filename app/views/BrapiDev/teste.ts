<script setup
lang = "ts" >
import { LineChart } from "@/components/ui/chart-line";

interface ChartData {
    Close: number | string;
    name: string;
}

const props = defineProps<{ data: ChartData[]; title: string }>();
</script>

    < template >
    <h2>{{ props.title }
} </h2>
    < LineChart : data = "props.data" index = "name" : categories = "[ 'Close' ]" : colors = "[ '#25faa4', '#eb3434' ]" />
        </>

--

< script setup lang = "ts" >
import BarChart from "@/components/Chart/BarChart.vue";
import type BarChartSkeleton from "@/components/Skeletons/components/Chart/BarChart.vue";
import type InternalServerError from "@/views/Exceptions/InternalServerError.vue";
import numberFormatter from "@/utils/numberFormatter";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import type { DetailedStock } from "@/types/BrapiDev/DetailedStock";
import { stockDetail } from "@/services/BrapiDev";
import { useStocksCurrencyStore } from "@/stores/useStocksCurrencyStore";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type LineChart from "@/components/Chart/LineChart.vue";

interface TreatedBarData {
    High: number | string;
    Low: number | string;
    name: string;
}

interface TreatedLineData {
    Close: number | string;
    name: string;
}

const route = useRoute();
const ticker = String(route.params.ticker);
const stocksCurrencyStore = useStocksCurrencyStore();
const error = ref<boolean>(false);
const loading = ref<boolean>(true);
const treatedBarData = ref<TreatedBarData[]>([]);
const treatedLineData = ref<TreatedLineData[]>([]);

function mapToTreatedBarData(detailedStock: DetailedStock): TreatedBarData[] {
    const locale = navigator.language;
    return detailedStock.historicalDataPrice.map((data) => ({
        High: numberFormatter(data.high),
        Low: numberFormatter(data.low),
        name: capitalizeFirstLetter(
            new Date(data.date * 1000).toLocaleDateString(locale, { day: "numeric", month: "short" }),
        ),
    }));
}

function mapToTreatedLineData(detailedStock: DetailedStock): TreatedLineData[] {
    const locale = navigator.language;
    return detailedStock.historicalDataPrice.map((data) => ({
        Close: numberFormatter(data.close),
        name: capitalizeFirstLetter(
            new Date(data.date).toLocaleDateString(locale, { month: "short", day: "numeric" }),
        ),
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

    const stockCurrency = stocksCurrencyStore.getDetailedStock(ticker) as DetailedStock;

    treatedBarData.value = mapToTreatedBarData(stockCurrency);
    treatedLineData.value = mapToTreatedLineData(stockCurrency);

    loading.value = false;
});
</>


    < template >
    <section class="container justify-center" >
        <BarChart v -if= "!loading && !error" : title = "ticker" : data = "treatedBarData" />
            <BarChartSkeleton v -if= "loading && !error" />
                <LineChart v -if= "!loading && !error" : title = "ticker" : data = "treatedLineData" />
                    <InternalServerError v -if= "error" />
                        </section>
                        </>
