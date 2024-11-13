<script setup lang="ts">
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
import numberFormatter from "@/utils/numberFormatter";
import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";
import type {Stock} from "@/types/BrapiDev/Stock";
import type {New} from "@/types/Finnhub/New";
import Link from "@/tags/Link.vue";

interface Props {
	icon: string;
	tableTitle: string;
	redirectTo: "/cryptos" | "/news" | "/stocks";
	coins?: CryptoCurrency[];
	stocks?: Stock[];
	news?: New[];
}

const props = defineProps<Props>();
</script>

<template>
    <article>
        <div class="flex justify-between">
            <div class="flex gap-1 items-center">
                <span> {{ props.icon }} </span>
                <h4> {{ props.tableTitle }} </h4>
            </div>
            <RouterLink :to="props.redirectTo" target="_self" class="text-link hover:underline mt-2 h-fit">
                See more
            </RouterLink>
        </div>
        <hr class="h-[1px] w-full bg-gray-300" />
        <ul class="flex flex-col gap-2">
            <li v-if="props.coins" v-for="(data, i) in props.coins" :key="i">
                <div class="li-first-container">
                    <div class="flex gap-2">
                        <Image class="rounded-full"
                            :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png`"
                            :alt="data.name + ' logo'" width="24" height="24" />
                        <RouterLink :to="`/cryptos/${data.name}`" target="_self" class="hover:underline">
                            <h5 class="line-clamp-1 text-left"> {{ data.name }} </h5>
                            </ RouterLink>
                    </div>
                    <span class="hidden mn:flex text-dark"> {{ data.symbol }} </span>
                </div>
                <div class="li-second-container">
                    <span> {{ numberFormatter(data.quote.USD.price) }} </span>
                    <span class="min-w-12 text-left"> {{ numberFormatter(data.quote.USD.volume_change_24h) }} </span>
                </div>
            </li>
            <li v-if="props.stocks" v-for="(data, i) in props.stocks" :key="i">
                <div class="li-first-container">
                    <div class="flex gap-2">
                        <Image class="rounded-full" :src="data.logo" :alt="data.name + ' logo'" width="24"
                            height="24" />
                        <RouterLink :to="`/stocks/${data.name}`" target="_self" class="hover:underline">
                            <h5 class="line-clamp-1 text-left"> {{ data.name }} </h5>
                            </ RouterLink>
                    </div>
                    <span class="hidden mn:flex text-dark"> {{ data.stock }} </span>
                </div>
                <div class="li-second-container">
                    <span> {{ numberFormatter(data.close) }} </span>
                    <span class="min-w-12 text-left"> {{ numberFormatter(data.change) }} </span>
                </div>
            </li>
            <li v-if="props.news" v-for="(data, i) in props.news" :key="i" class="flex gap-3">
                <Image :src="data.image" :alt="data.headline + ' logo'" width="82" height="47"
                    class="w-[82px] h-[47px] rounded-lg" />
                <div class="flex flex-col max-h-14 text-left">
                    <Link :href="data.url" target="_blank" class="hover:underline">
                    <h6 class="line-clamp-2 max-w-56 min-w-56 md:max-w-72 md:min-w-72 text-sm">
                        {{ data.headline }}
                    </h6>
                    </Link>
                    <span class="text-xs text-dark">{{ new Date(data.datetime * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }) }}</span>
                </div>
            </li>
        </ul>
    </article>
</template>

<style lang="css" scoped>
article {
    @apply flex flex-col justify-around md:justify-center bg-secondaryDarker rounded-lg gap-1 p-2 md:p-3 min-w-[310px] max-w-[310px] mn:min-w-[355px] mn:max-w-[355px] min-h-[250px] max-h-[250px] md:min-w-[425px] md:max-w-[425px] md:min-h-[250px] md:max-h-[250px];
}

.li-first-container {
    @apply flex gap-2 min-w-40 max-w-40 mn:min-w-60 mn:max-w-60 md:min-w-72 md:max-w-72 justify-between;
}

.li-second-container {
    @apply flex gap-2;
}

li {
    @apply flex gap-2 items-center justify-around mn:justify-between text-center;
}

span {
    @apply text-sm md:text-base;
}
</style>
