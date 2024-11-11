import {ref} from "vue";
import {defineStore} from "pinia";
import type {CurrencyQuotes} from "@/types/CurrencyQuotes/CurrencyQuotes";
import type {Rates} from "@/types/CurrencyQuotes/Rates";

export const useCurrencyQuotesStore = defineStore("currencyQuotes", () => {
	const currencyQuotes = ref<CurrencyQuotes>();
	const currency = ref<number>(1);
	const leftCode = ref<keyof Rates>("USD");
	const rightCode = ref<keyof Rates>("BRL");

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
