import { ref } from "vue";
import { defineStore } from "pinia";
import type { CryptoCurrency } from "@/types/CoinMarketCap/CryptoCurrency";
import type { CryptoDetail } from "@/types/CoinGecko/CryptoDetail";

export const useCryptoCurrencyStore = defineStore("cryptoCurrency", () => {
    const cryptoCurrencies = ref<CryptoCurrency[]>([]);
    const homeCryptoCurrencies = ref<CryptoCurrency[]>([]);
    const cryptosDetails = ref<Record<string, CryptoDetail>>({});

    function addCryptoDetails(cryptoDetail: CryptoDetail, slug: string): void {
        cryptosDetails.value[ slug ] = cryptoDetail;
    }

    function getCryptoDetail(slug: string): CryptoDetail | null {
        return cryptosDetails.value[ slug ] || null;
    }

    function setCryptoDetail(slug: string, cryptoDetail: CryptoDetail): void {
        cryptosDetails.value[ slug ] = cryptoDetail;
    }

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
        cryptosDetails,
        addCryptoDetails,
        setCryptoDetail,
        getCryptoDetail,
        setHomeCryptoCurrencies,
        addCryptoCurrencies,
        removeCryptoCurrency,
        detailCryptoCurrencyByName,
    };
});
