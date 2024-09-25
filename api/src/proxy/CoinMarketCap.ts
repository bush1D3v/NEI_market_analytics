import type { Request, Response } from "express";
import { get } from "../helpers/HttpClient.ts";
import dotenv from "dotenv";
import type { CryptoCurrency } from "../types/CoinMarketCap/CryptoCurrency.ts";
dotenv.config();

const BASE_API_URL = process.env.COINMARKETCAP_HOST as string;
const API_KEY = process.env.COINMARKETCAP_KEY as string;

const defaultHeaders = {
    "Accept-Encoding": "deflate, gzip",
    "referrer-policy": "origin-when-cross-origin",
    "X-CMC_PRO_API_KEY": API_KEY,
};

interface ResponseData {
    data: CryptoCurrency[];
}

export async function getMap(req: Request, res: Response) {
    const { limit = 10 } = req.query;

    try {
        const response = await get(
            `${BASE_API_URL}/v1/cryptocurrency/map?limit=${limit}`,
            defaultHeaders,
        );

        if (!response.ok) throw new Error(await response.json());

        const data: ResponseData = await response.json();
        res.json(data.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}
