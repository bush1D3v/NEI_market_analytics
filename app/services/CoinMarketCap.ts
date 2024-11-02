import {get} from "@/server/HttpClient";
import type {CryptoCurrency} from "@/types/CoinMarketCap/CryptoCurrency";

export async function listBitcoin(limit = 12, start = 1): Promise<CryptoCurrency[] | undefined> {
	try {
		const response = await get(
			`/v1/cryptocurrency/listings/latest?limit=${limit}&start=${start}`,
		);

		if (!response.ok) throw new Error(await response.json());

		const jsonData: CryptoCurrency[] = await response.json();

		return jsonData;
	} catch (error) {
		console.error(error);
	}
}

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
