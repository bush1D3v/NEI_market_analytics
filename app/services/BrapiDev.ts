import { bus } from "@/events/brapiDevEventEmitter";
import { get } from "@/server/HttpClient";
import type { SortBy } from "@/types/BrapiDev/SortBy";
import type { SortOrder } from "@/types/BrapiDev/SortOrder";
import type { Stock } from "@/types/BrapiDev/Stock";

/**
 * @description Handles the request to get the list of currency quotes.
 *
 * @param {number} limit - The limit number of cryptocurrencies to return
 * @param {number} page - The page number of cryptocurrencies to return
 * @returns Promise<Stock[] | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function listStocks(limit = 12, page = 1, sortBy?: SortBy, sortOrder?: SortOrder): Promise<Stock[] | undefined> {
    let url: string;

    if (sortBy && sortOrder) {
        url = `/api/quote/list?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    } else {
        url = `/api/quote/list?limit=${limit}&page=${page}`;
    }
    try {
        const response = await get(url);

        if (!response.ok) throw new Error(await response.json());

        const stocks: Stock[] = await response.json();

        if (!sortBy && !sortOrder) {
            bus.emit("getCurrencyStocks", { stocks });
        } else {
            bus.emit("getHomeCurrencyStocks", { stocks });
        }

        return stocks;
    } catch (error) {
        console.error(error);
    }
}
