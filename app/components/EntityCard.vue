<script setup lang="ts">
import Image from "@/tags/Image.vue";
import Button from "@/components/ui/button/Button.vue";
import numberFormatter from "@/utils/numberFormatter";

export interface EntityCardProps {
	id: string | number;
	name: string;
	symbol: string;
	image: string;
	routerLinkTo: string;
	price: number;
	market_cap: number;
	circulating_supply: number;
}

const props = defineProps<EntityCardProps>();
</script>

<template>
    <article class="flex flex-col bg-secondaryDarker gap-4 p-4 md:p-5 rounded-lg md:min-w-96">
        <div class="flex gap-4 items-center">
            <Image :src="props.image" :alt="props.name + ' logo'" width="50" height="50"
                class="w-10 h-10 md:w-[50px] md:h-[50px] rounded-full" />
            <div class="flex flex-col">
                <h3 class="line-clamp-1 max-w-56">{{ props.name }}</h3>
                <div class="flex gap-1 md:gap-[6px]">
                    <p>Currency</p>
                    <strong>{{ props.symbol }}</strong>
                    <p>&nbsp;·&nbsp; Chain ID</p>
                    <strong>{{ props.id }}</strong>
                </div>
            </div>
        </div>
        <hr class="h-[1px] w-full" />
        <h6 v-translate>Estatísticas</h6>
        <div class="md:font-semibold gap-2 md:gap-0 flex justify-between">
            <div>
                <strong>${{ numberFormatter(props.price) }}</strong>
                <p>Preço</p>
            </div>
            <div>
                <strong>{{ numberFormatter(props.market_cap) }}</strong>
                <p>Capitalização de mercado</p>
            </div>
            <div>
                <strong>{{ numberFormatter(props.circulating_supply) }}</strong>
                <p>Volume</p>
            </div>
        </div>
        <RouterLink :to="props.routerLinkTo">
            <Button class="w-full">Explore {{ props.name }}</Button>
        </RouterLink>
    </article>
</template>
