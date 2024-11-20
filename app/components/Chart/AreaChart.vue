<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'

interface ChartData {
    Open: number | string;
    Close: number | string;
    name: string;
}

const props = defineProps<{ data: ChartData[], title: string }>();
</script>

<template>
    <h2> {{ props.title }} </h2>
    <AreaChart :data="props.data" index="name" :categories="[ 'Open', 'Close' ]" :colors="[ '#25faa4', '#eb3434' ]"
        :filter-opacity="0.5" :rounded-corners="4" :margin="{ top: 0, bottom: 0, left: 0, right: 0 }" />
</template>
