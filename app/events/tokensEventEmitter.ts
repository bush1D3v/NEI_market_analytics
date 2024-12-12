import mitt, {type Emitter} from "mitt";
import type {CsrfToken} from "@/types/Tokens/CsrfToken";

type TokensEventEmitter = {
	csrfToken: CsrfToken;
};

const events = {
	getCsrfToken: (payload: TokensEventEmitter) => {
		document.cookie = `x-csrf-token=${payload.csrfToken.csrfToken}; Path=/; Secure; SameSite=Strict;`;
	},
};

type EventSchema<T extends Record<string, (payload: TokensEventEmitter) => void>> = {
	[K in keyof T]: Parameters<T[K]>[0];
};
type MittSchema = EventSchema<
	typeof events & {
		all: (payload: TokensEventEmitter) => void;
	}
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
	events[type as keyof typeof events](payload);
});
