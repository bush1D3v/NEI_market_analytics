<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import numberFormatter from '@/utils/numberFormatter';

interface ChartData {
    Volume: number | string;
    name: string;
}

const props = defineProps<{ data: ChartData[], title: string }>();
</script>

<template>
    <h2> {{ props.title }} </h2>
    <LineChart :data="props.data" index="name" :categories="[ 'Volume' ]" :colors="[ '#25faa4' ]" :y-formatter="(tick, i) => {
        return typeof tick === 'number'
            ? numberFormatter(tick)
            : ''
    }" />
</template>
