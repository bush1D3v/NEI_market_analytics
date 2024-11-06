import mitt, {type Emitter} from "mitt";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";
import type {Stock} from "@/types/BrapiDev/Stock";

type BrapiDevEventEmitter = {
	stocks: Stock[];
};

const events = {
	getCurrencyStocks: (payload: BrapiDevEventEmitter) => {
		const stockStore = useStocksCurrencyStore();
		stockStore.addStocksCurrencies(payload.stocks);
	},
};

type EventSchema<T extends Record<string, (payload: BrapiDevEventEmitter) => void>> = {
	[K in keyof T]: Parameters<T[K]>[0];
};
type MittSchema = EventSchema<
	typeof events & {
		all: (payload: BrapiDevEventEmitter) => void;
	}
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
	events[type as keyof typeof events](payload);
});
