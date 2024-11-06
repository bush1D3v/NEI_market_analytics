import {bus} from "@/events/brapiDevEventEmitter";
import {get} from "@/server/HttpClient";
import type {Stock} from "@/types/BrapiDev/Stock";

/**
 * @description Handles the request to get the list of currency quotes.
 *
 * @param {number} limit - The limit number of cryptocurrencies to return
 * @param {number} page - The page number of cryptocurrencies to return
 * @returns Promise<Stock[] | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listStocks(limit = 12, page = 1): Promise<Stock[] | undefined> {
	try {
		const response = await get(`/api/quote/list?limit=${limit}&page=${page}`);

		if (!response.ok) throw new Error(await response.json());

		const stocks: Stock[] = await response.json();

		bus.emit("getCurrencyStocks", {stocks});

		return stocks;
	} catch (error) {
		console.error(error);
	}
}
