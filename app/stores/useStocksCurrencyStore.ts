import {ref} from "vue";
import {defineStore} from "pinia";

import type {StocksCurrency} from "@/types/BrapiDev/StocksCurrency";

export const useStocksCurrencyStore = defineStore("stocksCurrency", () => {
	const stocksCurrencies = ref<StocksCurrency[]>([]);

	function addStocksCurrencies(stockCurrencyArray: StocksCurrency[]): void {
		stocksCurrencies.value.push(...stockCurrencyArray);
	}

	function removeStocksCurrency(id: string): void {
		stocksCurrencies.value = stocksCurrencies.value.filter(
			(stockCurrency) => stockCurrency.id.toString() !== id,
		);
	}

	function detailStocksCurrency(name: string): StocksCurrency | null {
		const stocksCurrency = stocksCurrencies.value.find(
			(stocksCurrency) => stocksCurrency.longName === name,
		);
		if (!stocksCurrency) {
			return null;
		}
		return stocksCurrency;
	}

	return {
		stocksCurrencies,
		addStocksCurrencies,
		removeStocksCurrency,
		detailStocksCurrency,
	};
});
