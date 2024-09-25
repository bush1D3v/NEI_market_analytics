import mitt, {type Emitter} from "mitt";
import {useCryptoCurrencyStore} from "@/stores/useCryptoCurrencyStore";
import type {RouteLocationNormalizedLoadedGeneric, Router} from "vue-router";
import {useToast} from "@/components/ui/toast/use-toast";
import {toast as sonner} from "vue-sonner";

const {toast} = useToast();
const cryptoCurrencyStore = useCryptoCurrencyStore();

type CryptoEventEmitter = {
	id: string;
	title: string;
	router?: Router;
	route?: RouteLocationNormalizedLoadedGeneric;
};

let date = new Date().toLocaleString("pt-BR", {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
});
date = date.charAt(0).toUpperCase() + date.slice(1);

const events = {
	insertCryptoCurrency: (payload: CryptoEventEmitter) => {
		sonner(payload.title, {
			description: date,
			action: {
				label: "Visualizar",
				onClick: () => payload.router?.push(`/crypto/${payload.id}`),
			},
		});
	},
	removeCryptoCurrency: (payload: CryptoEventEmitter) => {
		cryptoCurrencyStore.removeCryptoCurrency(payload.id);
		toast({
			title: payload.title,
			description: date,
		});
	},
};

type EventSchema<T extends Record<string, (payload: CryptoEventEmitter) => void>> = {
	[K in keyof T]: Parameters<T[K]>[0];
};
type MittSchema = EventSchema<
	typeof events & {
		all: (payload: CryptoEventEmitter) => void;
	}
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
	events[type as keyof typeof events](payload);
});
