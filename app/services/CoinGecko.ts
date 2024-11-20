import type { CryptoDetail } from "@/types/CoinGecko/CryptoDetail";
import { bus } from "@/events/coinGeckoEventEmitter";
import { get } from "@/server/HttpClient";

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

        const jsonData: CryptoDetail = await response.json();

        bus.emit("getDetailedCrypto", { crypto: jsonData, slug });

        return jsonData;
    } catch (error) {
        console.error(error);
    }
}
