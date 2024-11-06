<script setup lang="ts">
import CurrencySelect from "@/components/CurrencyQuotes/CurrencySelect.vue";
import ValueSelect from "@/components/CurrencyQuotes/ValueSelect.vue";
import Dialog from "@/components/CurrencyQuotes/Dialog.vue";
import Tooltip from "@/components/Tooltip.vue";
import type {Rates} from "@/types/CurrencyQuotes/Rates";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronDownIcon, ChevronUpIcon, DoubleArrowRightIcon} from "@radix-icons/vue";
import {useCurrencyQuotesStore} from "@/stores/useCurrencyQuotesStore";
import {listCurrencyQuotes} from "@/services/CurrencyQuotes";
import {Button} from "@/components/ui/button";
import {t} from "i18next";
import {ref, watch} from "vue";
import {CurrencyQuotesDtoValues} from "../Dto/CurrencyQuotesDtoValues";

const currencyQuotesStore = useCurrencyQuotesStore();

const isOpen = ref(false);
const isLoading = ref(false);
const isModalOpen = ref(false);
const crossRateResult = ref<number>();

async function calculateCrossRate(): Promise<void> {
	isLoading.value = true;
	let rates: Rates;

	if (currencyQuotesStore.currencyQuotes?.rates) {
		rates = currencyQuotesStore.currencyQuotes.rates;
	} else {
		const data = await listCurrencyQuotes();

		if (data) {
			rates = data.rates;
		} else {
			rates = CurrencyQuotesDtoValues;
		}
	}

	const rightRate = rates[currencyQuotesStore.rightCode as keyof typeof rates];
	const leftRate = rates[currencyQuotesStore.leftCode as keyof typeof rates];

	crossRateResult.value = (rightRate / leftRate) * currencyQuotesStore.currency;
	isLoading.value = false;
	isModalOpen.value = true;
}

watch(
	() => currencyQuotesStore.leftCode,
	(value) => {
		currencyQuotesStore.leftCode = value;
	},
);

watch(
	() => currencyQuotesStore.rightCode,
	(value) => {
		currencyQuotesStore.rightCode = value;
	},
);

watch(
	() => currencyQuotesStore.currency,
	(value) => {
		currencyQuotesStore.currency = value;
	},
);
</script>

<template>
    <Collapsible v-model:open="isOpen"
        class="fixed z-50 right-10 bottom-0 space-y-2 bg-material rounded-t-2xl shadow-2xl shadow-accent py-2 px-4 translate-ignore">
        <div class="flex items-center justify-between space-x-4">
            <h4 class="font-semibold pr-28">
                {{ t("Conversor de moedas") }}
            </h4>
            <CollapsibleTrigger as-child>
                <Button variant="ghost" size="sm" class="w-9 p-0 rounded-full">
                    <ChevronDownIcon class="w-6 h-6" v-if=isOpen />
                    <ChevronUpIcon class="w-6 h-6" v-if=!isOpen />
                    <span class="sr-only">{{ isOpen ? t('Fechar') : t('Abrir') }}</span>
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent class="space-y-2 flex flex-col gap-4">
            <div class="flex justify-between mt-2">
                <div>
                    <p class="text-text">{{ t("De") }}</p>
                    <CurrencySelect direction="left" />
                </div>
                <div>
                    <p class="text-text">{{ t("Para") }}</p>
                    <CurrencySelect direction="right" />
                </div>
            </div>
            <div class="w-full flex justify-between items-center">
                <hr class="h-[1px] w-5/12" />
                <Tooltip>
                    <template #trigger>
                        <Button variant="default" class="w-9 p-0 rounded-full">
                            <DoubleArrowRightIcon @click="currencyQuotesStore.invertCodes">
                                revert
                            </DoubleArrowRightIcon>
                        </Button>
                    </template>
                    <template #content>
                        <p class="text-text">{{ t("Inverter") }}</p>
                    </template>
                </Tooltip>
                <hr class="h-[1px] w-5/12" />
            </div>
            <div class="flex justify-center">
                <ValueSelect :currency="currencyQuotesStore.leftCode" direction="left" />
            </div>
            <Dialog v-model:open="isModalOpen" :result="crossRateResult">
                <template #trigger>
                    <Button class="w-full" @click="calculateCrossRate">
                        {{ isLoading ? t("Convertendo...") : t("Converter") }}
                    </Button>
                </template>
            </Dialog>
        </CollapsibleContent>
    </Collapsible>
</template>
