import { ref } from "vue";
import { defineStore } from "pinia";

import type { CurrencyQuotes } from "@/types/CurrencyQuotes/CurrencyQuotes";

export const useCurrencyQuotesStore = defineStore("currencyQuotes", () => {
    const currencyQuotes = ref<CurrencyQuotes>();
    const currency = ref<number>(1);
    const leftCode = ref<string>("USD");
    const rightCode = ref<string>("BRL");

    function setCurrencyQuotes(quotes: CurrencyQuotes): void {
        currencyQuotes.value = quotes;
    }

    function invertCodes(): void {
        const lastRightCode = rightCode.value;
        const lastLeftCode = leftCode.value;

        leftCode.value = lastRightCode;
        rightCode.value = lastLeftCode;
    }

    return {
        currencyQuotes,
        currency,
        leftCode,
        rightCode,
        setCurrencyQuotes,
        invertCodes,
    };
});
