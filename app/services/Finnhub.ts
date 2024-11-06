import {get} from "@/server/HttpClient";
import type {Category} from "@/types/Finnhub/Category";
import type {New} from "@/types/Finnhub/New";
import {bus} from "@/events/finnhubEventEmitter";

/**
 * @description Handles the request to get the list of market news.
 *
 * @param {Category} category - The category of the news
 * @returns Promise<CurrencyQuotes | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listMarketNews(category: Category = "crypto"): Promise<New[] | undefined> {
	const url = `/api/v1/news?category=${category}`;
	try {
		const response = await get(url);

		if (!response.ok) throw new Error(await response.json());

		const news: New[] = await response.json();

		bus.emit("getMarketNews", {category, news});

		return news;
	} catch (error) {
		console.error(error);
	}
}
