<script setup lang="ts">
import type {CryptoDataDescription} from "@/types/CoinGecko/CryptoDetail";
import numberFormatter from "@/utils/numberFormatter";
import {ChevronUpIcon, ChevronDownIcon} from "@radix-icons/vue";

const props = defineProps<{
	marketCapRank: CryptoDataDescription["market_cap_rank"];
	marketData: CryptoDataDescription["market_data"];
}>();
</script>

<template>
    <ul>
        <li>
            <span v-translate>Ranking de Capitalização de Mercado </span>
            - {{ props.marketCapRank }}
        </li>
        <li>
            <span v-translate>Preço</span>${{ numberFormatter(props.marketData?.current_price.usd || 0) }}
            <p :class="{ 'text-positive': (props.marketData?.price_change_percentage_24h || 0) > 0, 'text-negative': (props.marketData?.price_change_percentage_24h || 0) < 0 }">
                <ChevronUpIcon v-if="(props.marketData?.price_change_percentage_24h || 0) > 0" />
                <ChevronDownIcon v-else />
                <span > <span v-if="(props.marketData?.price_change_percentage_24h || 0) > 0">+</span> {{ numberFormatter(props.marketData?.price_change_percentage_24h || 0) }} </span>%
            </p>
        </li>
        <li>
            <span v-translate>Capitalização de Mercado</span> {{ numberFormatter(props.marketData?.market_cap.usd || 0) }}
            <p :class="{ 'text-positive': (props.marketData?.market_cap_change_percentage_24h || 0) > 0, 'text-negative': (props.marketData?.market_cap_change_percentage_24h || 0) < 0 }">
                <ChevronUpIcon v-if="(props.marketData?.market_cap_change_percentage_24h || 0) > 0" />
                <ChevronDownIcon v-else />
                <span > {{ numberFormatter(props.marketData?.market_cap_change_percentage_24h || 0) }} </span>%
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
