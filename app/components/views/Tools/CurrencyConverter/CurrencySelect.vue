<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CaretSortIcon, CheckIcon} from "@radix-icons/vue";
import {CurrencyQuotesDto} from "@/components/Dto/CurrencyQuotesDto";
import {ref} from "vue";
import {t} from "i18next";
import {cn} from "@/lib/utils";
import {listCurrencyQuotes} from "@/services/CurrencyQuotes";
import {useCurrencyQuotesStore} from "@/stores/useCurrencyQuotesStore";
import {onMounted} from "vue";
import {CurrencyQuotesDtoValues} from "@/components/Dto/CurrencyQuotesDtoValues";
import {watch} from "vue";
import type {Rates} from "@/types/CurrencyQuotes/Rates";

const currencyQuotesStore = useCurrencyQuotesStore();

interface Props {
	direction: "left" | "right";
}

const props = defineProps<Props>();

function selectItem(currency: KeyValue) {
	open.value = false;
	selectedValue.value = currency.key as keyof Rates;
	if (props.direction === "right") {
		currencyQuotesStore.rightCode = currency.key as keyof Rates;
	} else {
		currencyQuotesStore.leftCode = currency.key as keyof Rates;
	}
}

onMounted(async () => {
	if (!currencyQuotesStore.currencyQuotes) {
		const data = await listCurrencyQuotes();
		if (!data) {
			const currencies = {
				table: "default",
				rates: CurrencyQuotesDtoValues,
				lastupdate: "2024-11-03T18:21:47.000000-03:00", // ISO 8601 date string
			};
			currencyQuotesStore.setCurrencyQuotes(currencies);
		}
	}
});

interface KeyValue {
	key: string;
	value: string;
}

const open = ref(false);
const selectedValue =
	props.direction === "left"
		? ref(currencyQuotesStore.leftCode)
		: ref(currencyQuotesStore.rightCode);
const currencies: KeyValue[] = Object.entries(CurrencyQuotesDto)
	.map(([key, value]) => ({key, value}))
	.sort((a, b) => a.value.localeCompare(b.value));

watch(
	() => currencyQuotesStore.leftCode,
	(value) => {
		if (props.direction === "left") {
			selectedValue.value = value;
		}
	},
);

watch(
	() => currencyQuotesStore.rightCode,
	(value) => {
		if (props.direction === "right") {
			selectedValue.value = value;
		}
	},
);
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="ghost" role="combobox" :aria-expanded="open"
                class="w-[90px] justify-between border border-text">
                <span>{{ selectedValue }}</span>
                <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[250px] p-0 mr-1">
            <Command>
                <CommandInput class="h-9" :placeholder="t('Procurar moeda...')" />
                <CommandEmpty>{{ t("Moeda não encontrada") }}</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem v-for="currency in currencies" :key="currency.key" :value="currency.key"
                            @select="selectItem(currency)">
                            {{ t(currency.value) }}
                            <CheckIcon :class="cn(
                                'ml-auto h-4 w-4',
                                selectedValue === currency.value ? 'opacity-100' : 'opacity-0',
                            )" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
