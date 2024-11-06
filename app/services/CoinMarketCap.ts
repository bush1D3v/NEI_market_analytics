import {bus} from "@/events/coinMarketCapEventEmitter";
import {get} from "@/server/HttpClient";
import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";

/**
 * @description Handles the request to get the latest cryptocurrency listings.
 *
 * @param {number} limit - The limit number of cryptocurrencies to return
 * @param {number} start - The start number of cryptocurrencies to return
 * @returns Promise<CryptoCurrency[] | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listBitcoin(limit = 12, start = 1): Promise<CryptoCurrency[] | undefined> {
	try {
		const response = await get(
			`/v1/cryptocurrency/listings/latest?limit=${limit}&start=${start}`,
		);

		if (!response.ok) throw new Error(await response.json());

		const crypto: CryptoCurrency[] = await response.json();

		bus.emit("getCurrencyCryptos", {crypto});

		return crypto;
	} catch (error) {
		console.error(error);
	}
}

/**
 * @description Handles the request to get the latest cryptocurrency listings.
 *
 * @param {string} slug - The slug string
 * @returns Promise<CryptoCurrency | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function detailBitcoin(slug: string): Promise<CryptoCurrency | undefined> {
	try {
		const response = await get(`/v2/cryptocurrency/info?slug=${slug}`);

		if (!response.ok) throw new Error(await response.json());

		const jsonData: CryptoCurrency = await response.json();

		return jsonData;
	} catch (error) {
		console.error(error);
	}
}
