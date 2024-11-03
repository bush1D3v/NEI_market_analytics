import {ref} from "vue";
import {defineStore} from "pinia";

import type {CurrencyQuotes} from "@/types/CurrencyQuotes/CurrencyQuotes";

export const useCurrencyQuotesStore = defineStore("currencyQuotes", () => {
	const currencyQuotes = ref<CurrencyQuotes>();
	const leftCurrency = ref<string>("");
	const rightCurrency = ref<string>("");

	function invertCurrencies(): void {
		leftCurrency.value = rightCurrency.value;
		rightCurrency.value = leftCurrency.value;
	}

	return {
		currencyQuotes,
		leftCurrency,
		rightCurrency,
		invertCurrencies,
	};
});
