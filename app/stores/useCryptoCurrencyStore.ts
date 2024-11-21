import {ref} from "vue";
import {defineStore} from "pinia";
import type {CryptoCurrency} from "@/types/CoinGecko/CryptoCurrency";
import type {CryptoDetail} from "@/types/CoinGecko/CryptoDetail";

export const useCryptoCurrencyStore = defineStore("cryptoCurrency", () => {
	const cryptoCurrencies = ref<CryptoCurrency[]>([]);
	const homeCryptoCurrencies = ref<CryptoCurrency[]>([]);
	const cryptosDetails = ref<Record<string, CryptoDetail>>({});

	function addCryptoDetails(cryptoDetail: CryptoDetail, slug: string): void {
		cryptosDetails.value[slug] = cryptoDetail;
	}

	function getCryptoDetail(slug: string): CryptoDetail | null {
		return cryptosDetails.value[slug] || null;
	}

	function setCryptoDetail(slug: string, cryptoDetail: CryptoDetail): void {
		cryptosDetails.value[slug] = cryptoDetail;
	}

	function setHomeCryptoCurrencies(cryptoCurrencyArray: CryptoCurrency[]): void {
		homeCryptoCurrencies.value = cryptoCurrencyArray;
	}

	function getHomeCryptoCurrency(id: string): CryptoCurrency | null {
		return homeCryptoCurrencies.value.find((crypto) => crypto.id === id) || null;
	}

	function addCryptoCurrencies(cryptoCurrencyArray: CryptoCurrency[]): void {
		cryptoCurrencies.value.push(...cryptoCurrencyArray);
	}

	function getCryptoCurrency(id: string): CryptoCurrency | null {
		return cryptoCurrencies.value.find((crypto) => crypto.id === id) || null;
	}

	return {
		cryptoCurrencies,
		homeCryptoCurrencies,
		cryptosDetails,
		addCryptoDetails,
		setCryptoDetail,
		getCryptoDetail,
		setHomeCryptoCurrencies,
		addCryptoCurrencies,
		getCryptoCurrency,
		getHomeCryptoCurrency,
	};
});
