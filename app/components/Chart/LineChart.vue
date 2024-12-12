<script setup lang="ts">
import type {ChartData} from "./types/ChartData";
import {LineChart} from "@/components/ui/chart-line";
import dataTreat from "./treats/dataTreat";
import numberFormatter from "@/utils/numberFormatter";

const props = defineProps<{data: ChartData[]}>();
const categories: "name"[] = props.data[0].dynamicParams as "name"[];
const colors = props.data[0].colors ?? ["#25faa4", "#eb3434"];
const data = dataTreat(props.data);
</script>

<template>
    <LineChart :data="data" index="name" :categories="categories" :colors="colors" :y-formatter="(tick, i) => {
        return typeof tick === 'number'
            ? numberFormatter(tick)
            : ''
    }" />
</template>
