<script setup lang="ts">
import Image from "@/tags/Image.vue";
import Button from "@/components/ui/button/Button.vue";
import numberFormatter from "@/utils/numberFormatter";
import translate from "@/utils/externalDataTranslator";
import {onBeforeMount, ref} from "vue";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

export interface EntityCardProps {
	id: string | number;
	name: string;
	symbol: string;
	image: string;
	routerLinkTo: string;
	price: number;
	market_cap: number;
	circulating_supply: number;
	type: "crypto" | "stock";
}

const props = defineProps<EntityCardProps>();
const translatedId = ref<string | number>();

onBeforeMount(async () => {
	if (props.type !== "crypto") {
		translatedId.value = await translate(capitalizeFirstLetter(props.id as string));
	} else {
		translatedId.value = props.id;
	}
});
</script>

<template>
    <article class="w-80 flex flex-col bg-secondaryDarker gap-4 p-4 md:p-5 rounded-lg md:w-96">
        <div class="flex gap-4 items-center">
            <Image :src="props.image" :alt="props.name + ' logo'" width="50" height="50"
                class="w-10 h-10 md:w-[50px] md:h-[50px] rounded-full" />
            <div class="flex flex-col">
                <h3 class="line-clamp-1 max-w-56">{{ props.name }}</h3>
                <div class="flex gap-1 md:gap-[6px]">
                    <p v-translate>{{ props.type === "crypto" ? "Moeda" : "Símbolo" }}</p>
                    <strong>{{ props.symbol.toUpperCase() }}</strong>
                    &nbsp;·&nbsp;<p v-translate>{{ props.type === "crypto" ? "ID" : "Tipo" }}</p>
                    <strong class="max-w-8 md:max-w-12 line-clamp-1">{{ translatedId }}</strong>
                </div>
            </div>
        </div>
        <hr class="h-[1px] w-full" />
        <h6 v-translate>Estatísticas</h6>
        <div class="md:font-semibold gap-2 md:gap-0 flex justify-between">
            <div>
                <strong>{{ props.type === "crypto" ? "$" : "R$" }}{{ numberFormatter(props.price) }}</strong>
                <p v-translate>Preço</p>
            </div>
            <div>
                <strong>{{ numberFormatter(props.market_cap) }}</strong>
                <p v-translate>Capitalização de Mercado</p>
            </div>
            <div>
                <strong>{{ numberFormatter(props.circulating_supply) }}</strong>
                <p v-translate>Volume</p>
            </div>
        </div>
        <RouterLink :to="props.routerLinkTo">
            <Button class="w-full">Explore {{ props.name }}</Button>
        </RouterLink>
    </article>
</template>
