<script setup lang="ts">
import type {DetailedStock} from "@/types/BrapiDev/DetailedStock";
import {ChevronUpIcon, ChevronDownIcon} from "@radix-icons/vue";
import {computed} from "vue";
const props = defineProps<{
	data: DetailedStock;
}>();

const pricePercentage = computed(() => {
	return (
		((props.data?.regularMarketPrice - props.data?.regularMarketOpen) /
			props.data?.regularMarketOpen) *
		100
	);
});
</script>

<template>
    <ul>
        <li>
            <span v-translate>Preço</span> R${{ props.data?.regularMarketPrice || '' }}
            <p :class="{ 'text-positive': pricePercentage > 0, 'text-negative': pricePercentage < 0 }">
                <span>
                    <span v-if="pricePercentage > 0">+</span> <span v-else>-</span>{{ pricePercentage.toFixed(2) }} </span>%
                <ChevronUpIcon
                    v-if="pricePercentage > 0" />
                <ChevronDownIcon v-else />
            </p>
        </li>
        <li v-if="props.data?.marketCap">
            <span v-translate>Capitalização de Mercado</span> R${{ props.data.marketCap || '' }}
        </li>
    </ul>
</template>

<style lang="css" scoped>
ul {
    @apply flex flex-col items-center md:items-end gap-1;

    & li {
        @apply flex items-center gap-1;

        & p {
            @apply flex items-center gap-1;
        }
    }
}
</style>
