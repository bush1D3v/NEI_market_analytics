<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import numberFormatter from "@/utils/numberFormatter";
import type { ChartData } from "./types/ChartData";
import dataTreat from "./treats/dataTreat";

const props = defineProps<{ data: ChartData[]; }>();
const categories: string[] = props.data[ 0 ].dynamicParams;
const colors = props.data[ 0 ].colors ?? [ "#25faa4", "#eb3434" ];
const data = dataTreat(props.data);
</script>

<template>
    <LineChart :data="data" index="name" :categories="categories" :colors="colors" :y-formatter="(tick, i) => {
        return typeof tick === 'number'
            ? numberFormatter(tick)
            : ''
    }" />
</template>
