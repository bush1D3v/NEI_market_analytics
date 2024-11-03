import {get} from "@/server/HttpClient";

import type {Stock} from "@/types/BrapiDev/Stock";

/**
 * @description Handles the request to get the list of currency quotes.
 *
 * @returns Promise<Stock[] | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listCurrencyQuotes(): Promise<Stock[] | undefined> {
	try {
		const response = await get("/api/latest.json");

		if (!response.ok) throw new Error(await response.json());

		const jsonData: Stock[] = await response.json();

		return jsonData;
	} catch (error) {
		console.error(error);
	}
}
