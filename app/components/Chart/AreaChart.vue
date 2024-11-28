<script setup lang="ts">
import { AreaChart } from "@/components/ui/chart-area";

export interface AreaChartData {
    Open?: number | string;
    Close?: number | string;
    Market?: number | string;
    name: string;
}

const props = defineProps<{ data: AreaChartData[]; title: string }>();
// TODO: Refactor this to be more dynamic
const categories = [ props.data[ 0 ]?.Market ? 'Market' : 'Open', 'Close' ];
const colors = [ props.data[ 0 ]?.Market ? '#25faa4' : '#25faa4', '#eb3434' ];
</script>

<template>
    <h2> {{ props.title }} </h2>
    <AreaChart :data="props.data" index="name" :categories="categories" :colors="colors" :filter-opacity="0.5"
        :rounded-corners="4" :margin="{ top: 0, bottom: 0, left: 0, right: 0 }" />
</template>
