import mitt, {type Emitter} from "mitt";
import {useCurrencyQuotesStore} from "@/stores/useCurrencyQuotesStore";
import type {CurrencyQuotes} from "@/types/CurrencyQuotes/CurrencyQuotes";

type CurrencyQuotesEventEmitter = {
	quotes: CurrencyQuotes;
};

const events = {
	getCurrencyQuotes: (payload: CurrencyQuotesEventEmitter) => {
		const currencyStore = useCurrencyQuotesStore();
		currencyStore.setCurrencyQuotes(payload.quotes);
	},
};

type EventSchema<T extends Record<string, (payload: CurrencyQuotesEventEmitter) => void>> = {
	[K in keyof T]: Parameters<T[K]>[0];
};
type MittSchema = EventSchema<
	typeof events & {
		all: (payload: CurrencyQuotesEventEmitter) => void;
	}
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
	events[type as keyof typeof events](payload);
});
