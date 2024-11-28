<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";

export interface BarChartData {
    High?: number | string;
    Low?: number | string;
    Price?: number | string;
    name: string;
}

const props = defineProps<{ data: BarChartData[]; title: string }>();
// TODO: Refactor this to be more dynamic
const categories = [ props.data[ 0 ]?.Price ? 'Price' : 'High', 'Low' ];
const colors = [ props.data[ 0 ]?.Price ? '#25faa4' : '#25faa4', '#eb3434' ];
</script>

<template>
    <h2> {{ props.title }} </h2>
    <BarChart :data="props.data" index="name" :categories="categories" :colors="colors" :filter-opacity="0.25"
        :rounded-corners="4" :margin="{ top: 0, bottom: 0, left: 0, right: 0 }" />
</template>
