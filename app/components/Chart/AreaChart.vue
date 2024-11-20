<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'

interface ChartData {
    High: number | string;
    Low: number | string;
    name: string;
}

const props = defineProps<{ data: ChartData[], title: string }>();
</script>

<template>
    <h2> {{ props.title }} </h2>
    <AreaChart :data="props.data" index="name" :categories="[ 'High', 'Low' ]" :colors="[ '#25faa4', '#eb3434' ]" />
</template>
