import mitt, {type Emitter} from "mitt";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";

type CoinMarketCapEventEmitter = {
	crypto: CryptoCurrency[];
};

const events = {
	getCurrencyCryptos: (payload: CoinMarketCapEventEmitter) => {
		const cryptoStore = useCryptoCurrencyStore();
		cryptoStore.addCryptoCurrencies(payload.crypto);
	},
	getSortCurrencyCryptos: (payload: CoinMarketCapEventEmitter) => {
		const cryptoStore = useCryptoCurrencyStore();
		cryptoStore.setHomeCryptoCurrencies(payload.crypto);
	},
};

type EventSchema<T extends Record<string, (payload: CoinMarketCapEventEmitter) => void>> = {
	[K in keyof T]: Parameters<T[K]>[0];
};
type MittSchema = EventSchema<
	typeof events & {
		all: (payload: CoinMarketCapEventEmitter) => void;
	}
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
	events[type as keyof typeof events](payload);
});
