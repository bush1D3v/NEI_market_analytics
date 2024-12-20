import {ref} from "vue";
import {defineStore} from "pinia";

import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";

export const useCryptoCurrencyStore = defineStore("cryptoCurrency", () => {
	const cryptoCurrencies = ref<CryptoCurrency[]>([]);
	const homeCryptoCurrencies = ref<CryptoCurrency[]>([]);

	function setHomeCryptoCurrencies(cryptoCurrencyArray: CryptoCurrency[]): void {
		homeCryptoCurrencies.value = cryptoCurrencyArray;
	}

	function addCryptoCurrencies(cryptoCurrencyArray: CryptoCurrency[]): void {
		cryptoCurrencies.value.push(...cryptoCurrencyArray);
	}

	function removeCryptoCurrency(id: string): void {
		cryptoCurrencies.value = cryptoCurrencies.value.filter(
			(cryptoCurrency) => cryptoCurrency.id.toString() !== id,
		);
	}

	function detailCryptoCurrencyByName(name: string): CryptoCurrency | null {
		const cryptoCurrency = cryptoCurrencies.value.find(
			(cryptoCurrency) => cryptoCurrency.name === name,
		);
		if (!cryptoCurrency) {
			return null;
		}
		return cryptoCurrency;
	}

	return {
		cryptoCurrencies,
		homeCryptoCurrencies,
		setHomeCryptoCurrencies,
		addCryptoCurrencies,
		removeCryptoCurrency,
		detailCryptoCurrencyByName,
	};
});
