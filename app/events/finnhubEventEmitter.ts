import mitt, {type Emitter} from "mitt";
import {useNewsStore} from "@/stores/useNewsStore";
import type {Category} from "@/types/Finnhub/Category";
import type {New} from "@/types/Finnhub/New";

type FinnhubEventEmitter = {
	category: Category;
	news: New[];
};

const events = {
	getMarketNews: (payload: FinnhubEventEmitter) => {
		const newsStore = useNewsStore();
		newsStore.addNews(payload.news, payload.category);
	},
};

type EventSchema<T extends Record<string, (payload: FinnhubEventEmitter) => void>> = {
	[K in keyof T]: Parameters<T[K]>[0];
};
type MittSchema = EventSchema<
	typeof events & {
		all: (payload: FinnhubEventEmitter) => void;
	}
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
	events[type as keyof typeof events](payload);
});
