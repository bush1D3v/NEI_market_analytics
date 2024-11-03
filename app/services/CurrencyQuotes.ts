import {get} from "@/server/HttpClient";

import type {CurrencyQuotes} from "@/types/CurrencyQuotes/CurrencyQuotes";

/**
 * @description Handles the request to get the list of currency quotes.
 *
 * @returns Promise<CurrencyQuotes | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listCurrencyQuotes(): Promise<CurrencyQuotes | undefined> {
	try {
		const response = await get("/api/latest.json");

		if (!response.ok) throw new Error(await response.json());

		const jsonData: CurrencyQuotes = await response.json();

		return jsonData;
	} catch (error) {
		console.error(error);
	}
}
