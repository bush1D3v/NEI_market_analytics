import { get } from "@/server/HttpClient";
import type { CryptoCurrency } from "@/types/CoinMarketCap/CryptoCurrency";

export async function listBitcoin(limit = 10): Promise<CryptoCurrency[] | undefined> {
    try {
        const response = await get(
            `/v1/cryptocurrency/map?limit=${limit}`,
        );

        if (!response.ok) throw new Error(await response.json());

        const jsonData: CryptoCurrency[] = await response.json();

        return jsonData;
    } catch (error) {
        console.error(error);
    }
}
