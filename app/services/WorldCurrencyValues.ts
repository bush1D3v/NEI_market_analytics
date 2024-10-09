import {get}  from "@/server/HttpClient";
import type {CurrencyValue} from "@/types/TradingView/CurrencyValue";

export async function listDollar(limit = 12, start = 1): Promise<CurrencyValue[] | undefined> {

    try {
        const response = await get(`/your-rest-implementation.com/api/authorize/latest?limit=${limit}&start=${start}`)

        if(!response.ok) throw new Error(await response.json())

        const jsonData: CurrencyValue[] = await response.json();

        return jsonData;
    }catch (error){
        console.error(error)

    }

}
