import mitt, { type Emitter } from "mitt";
import { useCryptoCurrencyStore } from "@/stores/useCryptoCurrencyStore";
import type { CryptoDetail } from "@/types/CoinGecko/CryptoDetail";
import type { CryptoCurrency } from "@/types/CoinGecko/CryptoCurrency";

type CoinGeckoEventEmitter = {
    cryptos?: CryptoCurrency[];
    crypto?: CryptoDetail;
    slug?: string;
};

const events = {
    getCryptoCurrencies: (payload: CoinGeckoEventEmitter) => {
        const cryptoStore = useCryptoCurrencyStore();
        cryptoStore.addCryptoCurrencies(payload.cryptos as CryptoCurrency[]);
    },
    getSortedCryptoCurrencies: (payload: CoinGeckoEventEmitter) => {
        const cryptoStore = useCryptoCurrencyStore();
        cryptoStore.setHomeCryptoCurrencies(payload.cryptos as CryptoCurrency[]);
    },
    getDetailedCrypto: (payload: CoinGeckoEventEmitter) => {
        const cryptoStore = useCryptoCurrencyStore();
        cryptoStore.addCryptoDetails(payload.crypto as CryptoDetail, payload.slug as string);
    },
};

type EventSchema<T extends Record<string, (payload: CoinGeckoEventEmitter) => void>> = {
    [ K in keyof T ]: Parameters<T[ K ]>[ 0 ];
};
type MittSchema = EventSchema<
    typeof events & {
        all: (payload: CoinGeckoEventEmitter) => void;
    }
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
    events[ type as keyof typeof events ](payload);
});
