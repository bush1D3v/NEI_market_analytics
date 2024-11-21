import type { CryptoDetail } from "@/types/CoinGecko/CryptoDetail";
import type { CryptoCurrency } from "@/types/CoinGecko/CryptoCurrency";
import type { Order } from "@/types/CoinGecko/Order";
import type { PriceChangePercentage } from "@/types/CoinGecko/PriceChangePercentage";
import { bus } from "@/events/coinGeckoEventEmitter";
import { get } from "@/server/HttpClient";

/**
 * @description Handles the request to get the cryptocurrency listing.
 *
 * @param {number} per_page - The limit number of cryptocurrencies to return
 * @param {number} page - The page number of cryptocurrencies to return
 * @param {Order} order - The sort order of cryptocurrencies to return
 * @param {PriceChangePercentage} price_change_percentage - The price change percentage of cryptocurrencies to return
 * @returns Promise<CryptoCurrency[] | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listCryptoCurrencies(
    per_page = 12,
    page = 1,
    order?: Order,
    price_change_percentage?: PriceChangePercentage,
): Promise<CryptoCurrency[] | undefined> {
    let url: string;

    if (price_change_percentage && order) {
        url = `/coins/markets?vs_currency=usd&per_page=${per_page}&page=${page}&price_change_percentage=${price_change_percentage}&order=${order}&category=adventure-games&precision=2`;
    } else {
        url = `/coins/markets?vs_currency=usd&per_page=${per_page}&page=${page}&precision=2`;
    }
    try {
        const response = await get(url);

        if (!response.ok) throw new Error(await response.json());

        const cryptos: CryptoCurrency[] = await response.json();

        if (!price_change_percentage && !order) {
            bus.emit("getCryptoCurrencies", { cryptos });
        } else {
            bus.emit("getSortedCryptoCurrencies", { cryptos });
        }

        return cryptos;
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Handles the request to get the cryptocurrency.
 *
 * @param {string} slug - The slug string
 * @returns Promise<CryptoCurrency | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function detailCrypto(slug: string): Promise<CryptoDetail | undefined> {
    const from = new Date();
    const to = new Date();

    from.setDate(from.getDate() - 31);

    const url = `/coins/${slug}/market_chart/range?vs_currency=usd&from=${from.getTime() / 1000}&to=${to.getTime() / 1000}&precision=2`;

    try {
        const response = await get(url);

        if (!response.ok) throw new Error(await response.json());

        const crypto: CryptoDetail = await response.json();

        bus.emit("getDetailedCrypto", { crypto, slug });

        return crypto;
    } catch (error) {
        console.error(error);
    }
}
