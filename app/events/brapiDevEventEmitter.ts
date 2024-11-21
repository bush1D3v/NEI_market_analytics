import mitt, {type Emitter} from "mitt";
import {useStocksCurrencyStore} from "@/stores/useStocksCurrencyStore";
import type {Stock} from "@/types/BrapiDev/Stock";
import type {DetailedStock} from "@/types/BrapiDev/DetailedStock";

type BrapiDevEventEmitter = {
	stocks?: Stock[];
	detailedStock?: DetailedStock;
};

const events = {
	getCurrencyStocks: (payload: BrapiDevEventEmitter) => {
		const stockStore = useStocksCurrencyStore();
		stockStore.addStocksCurrencies(payload.stocks as Stock[]);
	},
	getHomeCurrencyStocks: (payload: BrapiDevEventEmitter) => {
		const stockStore = useStocksCurrencyStore();
		stockStore.setHomeStockCurrencies(payload.stocks as Stock[]);
	},
	getDetailedStock: (payload: BrapiDevEventEmitter) => {
		const stockStore = useStocksCurrencyStore();
		stockStore.setDetailedStock(payload.detailedStock as DetailedStock);
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
