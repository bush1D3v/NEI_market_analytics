<script setup lang="ts">
import type {CryptoDataDescription} from "@/types/CoinGecko/CryptoDetail";
import numberFormatter from "@/utils/numberFormatter";
import {ChevronUpIcon, ChevronDownIcon} from "@radix-icons/vue";
import {computed} from "vue";

const props = defineProps<{
	marketCapRank: CryptoDataDescription["market_cap_rank"];
	marketData: CryptoDataDescription["market_data"];
}>();

const pricePercentage = computed(() => {
	return props.marketData?.price_change_percentage_24h || 0;
});
</script>

<template>
    <ul>
        <li>
            <span v-translate>Ranking de Capitalização de Mercado </span>
            - {{ props.marketCapRank }}
        </li>
        <li>
            <span v-translate>Preço</span>${{ numberFormatter(props.marketData?.current_price.usd || 0) }}
            <p :class="{ 'text-positive': pricePercentage > 0, 'text-negative': pricePercentage < 0 }">
                <span> <span v-if="pricePercentage > 0">+</span>{{ pricePercentage.toFixed(2) }} </span>%
                <ChevronUpIcon v-if="pricePercentage > 0" />
                <ChevronDownIcon v-else />
            </p>
        </li>
        <li>
            <span v-translate>Capitalização de Mercado</span> {{ numberFormatter(props.marketData?.market_cap.usd || 0) }}
            <p :class="{ 'text-positive': pricePercentage > 0, 'text-negative': pricePercentage < 0 }">
                <span> <span v-if="pricePercentage > 0">+</span>{{ numberFormatter(pricePercentage) }} </span>%
                <ChevronUpIcon v-if="pricePercentage > 0" />
                <ChevronDownIcon v-else />
            </p>
        </li>
    </ul>
</template>

<style lang="css" scoped>
ul {
    @apply flex flex-col items-end gap-1;

    & li {
        @apply flex items-center gap-1;

        & p {
            @apply flex items-center gap-1;
        }
    }
}
</style>
