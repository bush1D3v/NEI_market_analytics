import {ref} from "vue";
import {defineStore} from "pinia";

import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";

export const useCryptoCurrencyStore = defineStore("cryptoCurrency", () => {
	const cryptoCurrencies = ref<CryptoCurrency[]>([]);

	function addCryptoCurrency(cryptoCurrency: CryptoCurrency): void {
		cryptoCurrencies.value.push(cryptoCurrency);
	}

	function removeCryptoCurrency(id: string): void {
		cryptoCurrencies.value = cryptoCurrencies.value.filter(
			(cryptoCurrency) => cryptoCurrency.id.toString() !== id,
		);
	}

	function detailCryptoCurrency(id: string): CryptoCurrency | undefined {
		const cryptoCurrency = cryptoCurrencies.value.find(
			(cryptoCurrency) => cryptoCurrency.id.toString() !== id,
		);
		if (!cryptoCurrency) {
			return;
		}
		return cryptoCurrency;
	}

	return {cryptoCurrencies, addCryptoCurrency, removeCryptoCurrency, detailCryptoCurrency};
});
