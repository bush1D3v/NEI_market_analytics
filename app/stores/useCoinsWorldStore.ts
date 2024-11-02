import {ref} from "vue";
import {defineStore} from "pinia";

import type {CurrencyValue} from "@/types/TradingView/CurrencyValue";

export const useCryptoCurrencyStore = defineStore("coinsWorld", () => {
	const coinsCurrencies = ref<CurrencyValue[]>([]);

	function addCoinsCurrency(coinsCurrencyArray: CurrencyValue[]) {
		coinsCurrencies.value.push(...coinsCurrencyArray);
	}
	function removeCoinsCurrency(id: string): void {
		coinsCurrencies.value = coinsCurrencies.value.filter(
			(coinsCurrencies) => coinsCurrencies.id.toString() !== id,
		);
	}

	function detailCoinsCurrencyByName(name: string): CurrencyValue | null {
		const coinsCurrency = coinsCurrencies.value.find(
			(coinsCurrency) => coinsCurrency.name === name,
		);
		if (!coinsCurrency) {
			return null;
		}
		return coinsCurrency;
	}

	return {
		coinsCurrencies,
		addCoinsCurrency,
		removeCoinsCurrency,
		detailCoinsCurrencyByName,
	};
});
