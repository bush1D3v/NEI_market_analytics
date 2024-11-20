<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

interface ChartData {
    High: number | string;
    Low: number | string;
    name: string;
}

const props = defineProps<{ data: ChartData[], title: string }>();
</script>

<template>
    <h2> {{ props.title }} </h2>
    <LineChart :data="props.data" index="name" :categories="[ 'High', 'Low' ]" :colors="[ '#25faa4', '#eb3434' ]"
        :y-formatter="(tick, i) => {
            return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : ''
        }" />
</template>
