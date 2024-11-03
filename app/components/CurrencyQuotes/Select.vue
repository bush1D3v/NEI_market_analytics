<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-icons/vue";
import { CurrencyQuotesDto } from "@/components/Dto/CurrencyQuotesDto";
import { ref } from "vue";
import { t } from "i18next";
import { listCurrencyQuotes } from "@/services/CurrencyQuotes";
import { useCurrencyQuotesStore } from "@/stores/useCurrencyQuotesStore";
import { onMounted } from "vue";
import { CurrencyQuotesDtoValues } from "../Dto/CurrencyQuotesDtoValues";
import { watch } from "vue";

const currencyQuotesStore = useCurrencyQuotesStore();

interface Props {
    direction: "left" | "right";
}

const props = defineProps<Props>();

async function loadCurrencyQuotes() {
    return await listCurrencyQuotes();
}

function selectItem(currency: KeyValue) {
    open.value = false;
    selectedValue.value = currency.value;
    if (props.direction === "left") currencyQuotesStore.leftCurrency = currency.value;
    else currencyQuotesStore.rightCurrency = currency.value;
}

onMounted(async () => {
    const stateCurrencyQuotes = currencyQuotesStore.currencyQuotes;

    if (!stateCurrencyQuotes) {
        const data = await loadCurrencyQuotes();
        if (!data) {
            const currencies = {
                table: "default",
                rates: CurrencyQuotesDtoValues,
                lastupdate: "2024-11-03T18:21:47.000000-03:00", // ISO 8601 date string
            };
            currencyQuotesStore.setCurrencyQuotes(currencies);
        }
        else currencyQuotesStore.setCurrencyQuotes(data);
    }
});

interface KeyValue {
    key: string;
    value: string;
}

const open = ref(false)
const selectedValue = props.direction === "left" ? ref(currencyQuotesStore.leftCurrency) : ref(currencyQuotesStore.rightCurrency)
const currencies: KeyValue[] = Object.entries(CurrencyQuotesDto)
    .map(([ key, value ]) => ({ key, value }))
    .sort((a, b) => a.value.localeCompare(b.value))

watch(() => currencyQuotesStore.leftCurrency, (value) => {
    if (props.direction === 'left') {
        selectedValue.value = value;
    }
});

watch(() => currencyQuotesStore.rightCurrency, (value) => {
    if (props.direction === 'right') {
        selectedValue.value = value;
    }
});
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
                {{ t(selectedValue) || t("Search currency...") }}
                <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[290px] p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search currency..." />
                <CommandEmpty>{{ t("Nenhuma moeda encontrada.") }}</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem v-for="currency in currencies" :key="currency.key" :value="currency.value"
                            @select="() => selectItem(currency)">
                            {{ t(currency.value) }}
                            <CheckIcon
                                :class="`ml-auto h-4 w-4 ${selectedValue === currency.value ? 'opacity-100' : 'opacity-0'}`" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
