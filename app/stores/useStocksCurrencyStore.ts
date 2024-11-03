import {ref} from "vue";
import {defineStore} from "pinia";

import type {Stock} from "@/types/BrapiDev/Stock";

export const useStocksCurrencyStore = defineStore("stocksCurrency", () => {
	const stocksCurrencies = ref<Stock[]>([]);

	function addStocksCurrencies(stockCurrencyArray: Stock[]): void {
		stocksCurrencies.value.push(...stockCurrencyArray);
	}

	function detailStocksCurrency(name: string): Stock | null {
		const stocksCurrency = stocksCurrencies.value.find(
			(stocksCurrency) => stocksCurrency.name === name,
		);
		if (!stocksCurrency) {
			return null;
		}
		return stocksCurrency;
	}

	return {
		stocksCurrencies,
		addStocksCurrencies,
		detailStocksCurrency,
	};
});
