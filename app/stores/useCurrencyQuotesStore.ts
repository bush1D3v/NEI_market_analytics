import { ref } from "vue";
import { defineStore } from "pinia";

import type { CurrencyQuotes } from "@/types/CurrencyQuotes/CurrencyQuotes";

export const useCurrencyQuotesStore = defineStore("currencyQuotes", () => {
    const currencyQuotes = ref<CurrencyQuotes>();
    const leftCurrency = ref<string>("");
    const rightCurrency = ref<string>("");

    function setCurrencyQuotes(quotes: CurrencyQuotes): void {
        currencyQuotes.value = quotes;
    }

    function invertCurrencies(): void {
        const lastRightValue = rightCurrency.value;
        const lastLeftValue = leftCurrency.value;

        leftCurrency.value = lastRightValue;
        rightCurrency.value = lastLeftValue;
    }

    return {
        currencyQuotes,
        leftCurrency,
        rightCurrency,
        setCurrencyQuotes,
        invertCurrencies,
    };
});
