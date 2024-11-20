import type { Request, Response } from "express";
import { get } from "../helpers/HttpClient.ts";
import dotenv from "dotenv";
import type { CryptoDetail } from "../types/CoinGecko/CryptoDetail.ts";
dotenv.config();

const BASE_API_URL = process.env.COINGECKO_HOST as string;
const API_KEY = process.env.COINGECKO_KEY as string;

const defaultHeaders = {
    "Accept-Encoding": "deflate, gzip",
    "referrer-policy": "origin-when-cross-origin",
    "X_CG_DEMO_API_KEY": API_KEY,
};

interface DetailQueryParams {
    vs_currency?: string;
    from?: number;
    to?: number;
}

/**
 * @description Handles the request to get the cryptocurrency.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export async function detailCrypto(req: Request, res: Response): Promise<void> {
    const { vs_currency, from, to }: DetailQueryParams = req.query;
    const slug = req.params.slug;

    const url = `${BASE_API_URL}/coins/${slug.toLowerCase()}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`;

    try {
        const response = await get(url, defaultHeaders);

        if (!response.ok) throw new Error(await response.json());

        const jsonData: CryptoDetail = await response.json();

        res.json(jsonData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}
