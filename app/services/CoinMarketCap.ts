import {bus} from "@/events/coinMarketCapEventEmitter";
import {get} from "@/server/HttpClient";
import type {Sort} from "@/types/CoinMarketCap/Sort";
import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";

/**
 * @description Handles the request to get the latest cryptocurrency listings.
 *
 * @param {number} limit - The limit number of cryptocurrencies to return
 * @param {number} start - The start number of cryptocurrencies to return
 * @param {string} sort - The sort order of cryptocurrencies to return
 * @returns Promise<CryptoCurrency[] | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listBitcoin(
	limit = 12,
	start = 1,
	sort?: Sort,
): Promise<CryptoCurrency[] | undefined> {
	let url: string;

	if (sort) {
		url = `/v1/cryptocurrency/listings/latest?limit=${limit}&start=${start}&sort=${sort}`;
	} else {
		url = `/v1/cryptocurrency/listings/latest?limit=${limit}&start=${start}`;
	}
	try {
		const response = await get(url);

		if (!response.ok) throw new Error(await response.json());

		const crypto: CryptoCurrency[] = await response.json();

		if (!sort) {
			bus.emit("getCurrencyCryptos", {crypto});
		} else {
			bus.emit("getSortCurrencyCryptos", {crypto});
		}

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
