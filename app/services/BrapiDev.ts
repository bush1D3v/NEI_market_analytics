import { get } from "@/server/HttpClient";
import type { Stock } from "@/types/BrapiDev/Stock";

export async function listStocks(limit = 12, page = 1): Promise<Stock[] | undefined> {
    try {
        const response = await get(
            `/api/quote/list?limit=${limit}&page=${page}`,
        );

        if (!response.ok) throw new Error(await response.json());

        const jsonData: Stock[] = await response.json();

        return jsonData;
    } catch (error) {
        console.error(error);
    }
}
