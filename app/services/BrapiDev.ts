import {get} from "@/server/HttpClient";
import type {StocksCurrency} from "@/types/BrapiDev/StocksCurrency";


export async function listStocks(limit = 12, offset = 0): Promise<StocksCurrency[] | undefined> {
    try {
        const response = await get (`/api/quote/list?token=${process.env.BRAPIDEV_KEY}&limit=${limit}&offset=${offset}`);


        if (!response.ok) throw new Error(await response.json());


        const jsonData: StocksCurrency[] = await response.json();


        return jsonData;
    }catch (error) {
        console.error(error);
    }


}
