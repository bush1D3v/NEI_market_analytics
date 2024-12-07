<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
import type { ChartData } from "./types/ChartData";
import dataTreat from "./treats/dataTreat";

const props = defineProps<{ data: ChartData[]; }>();
const categories: string[] = props.data[ 0 ].dynamicParams;
const colors = props.data[ 0 ].colors ?? [ "#25faa4", "#eb3434" ];
const data = dataTreat(props.data);
</script>

<template>
    <BarChart :data="data" index="name" :categories="categories" :colors="colors" :filter-opacity="0.25"
        :rounded-corners="4" :margin="{ top: 0, bottom: 0, left: 0, right: 0 }" />
</template>
