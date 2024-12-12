import dotenv from "dotenv";
import type {Request, Response} from "express";
import type {CryptoDetail} from "../types/CoinGecko/CryptoDetail.ts";
import type {CryptoCurrency} from "../types/CoinGecko/CryptoCurrency.ts";
import {get} from "../helpers/HttpClient.ts";
dotenv.config();

const BASE_API_URL = process.env.COINGECKO_HOST as string;
const API_KEY = process.env.COINGECKO_KEY as string;

const defaultHeaders = {
	"Accept-Encoding": "deflate, gzip",
	"referrer-policy": "origin-when-cross-origin",
	X_CG_DEMO_API_KEY: API_KEY,
};

interface ListQueryParams {
	vs_currency?: string;
	per_page?: number;
	page?: number;
	price_change_percentage?: string;
	order?: string;
	category?: string;
	precision?: number;
}

/**
 * @description Handles the request to get the cryptocurrency.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export async function listCryptoCurrencies(req: Request, res: Response): Promise<void> {
	const {
		vs_currency,
		per_page,
		page,
		price_change_percentage,
		order,
		category,
		precision,
	}: ListQueryParams = req.query;

	let url: string;

	if (price_change_percentage && order) {
		url = `${BASE_API_URL}/coins/markets?vs_currency=${vs_currency}&per_page=${per_page}&page=${page}&price_change_percentage=${price_change_percentage}&order=${order}&category=${category}&precision=${precision}`;
	} else {
		url = `${BASE_API_URL}/coins/markets?vs_currency=${vs_currency}&per_page=${per_page}&page=${page}&precision=${precision}`;
	}

	try {
		const response = await get(url, defaultHeaders);

		if (!response.ok) throw new Error(await response.json());

		const cryptos: CryptoCurrency[] = await response.json();

		res.json(cryptos);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error});
	}
}

interface DetailQueryParams {
	vs_currency?: string;
	from?: number;
	to?: number;
	precision?: number;
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
	const {vs_currency, from, to, precision}: DetailQueryParams = req.query;
	const slug = encodeURIComponent(req.params.slug);

	const url = `${BASE_API_URL}/coins/${slug}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}&precision=${precision}`;

	try {
		const response = await get(url, defaultHeaders);

		if (!response.ok) throw new Error(await response.json());

		const jsonData: CryptoDetail = await response.json();

		res.json(jsonData);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error});
	}
}
