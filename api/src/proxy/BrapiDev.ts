import type {Request, Response} from "express";
import dotenv from "dotenv";
import {get} from "../helpers/HttpClient.ts";
import type {Stock} from "../types/BrapiDev/Stock.ts";
import type {SortBy} from "../types/BrapiDev/SortBy.ts";
import type {SortOrder} from "../types/BrapiDev/SortOrder.ts";
import type {ValidRanges} from "../types/BrapiDev/ValidRanges.ts";
import type {ValidIntervals} from "../types/BrapiDev/ValidIntervals.ts";
import type {DetailedStock} from "../types/BrapiDev/DetailedStock.ts";
dotenv.config();

const BASE_API_URL = process.env.BRAPI_HOST as string;
const API_KEY = process.env.BRAPI_KEY as string;

const defaultHeaders = {
	"Accept-Encoding": "deflate, gzip",
	"referrer-policy": "origin-when-cross-origin",
	authorization: `Bearer ${API_KEY}`,
};

interface ListQueryParams {
	limit?: number;
	page?: number;
	sortBy?: SortBy;
	sortOrder?: SortOrder;
}

interface ResponseListStocks {
	stocks: Stock[];
}

/**
 * @description Handles the request to get the stocks listing.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export async function listStocks(req: Request, res: Response): Promise<void> {
	const {limit = 12, page = 1, sortBy, sortOrder}: ListQueryParams = req.query;

	let url: string;

	if (sortBy && sortOrder) {
		url = `${BASE_API_URL}/quote/list?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
	} else {
		url = `${BASE_API_URL}/quote/list?limit=${limit}&page=${page}`;
	}

	try {
		const response = await get(url, defaultHeaders);

		if (!response.ok) throw new Error(await response.json());

		const jsonData: ResponseListStocks = await response.json();

		res.status(200).json(jsonData.stocks);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error});
	}
}

interface DetailQueryParams {
	range?: ValidRanges;
	interval?: ValidIntervals;
}

interface ResponseDetailStock {
	results: DetailedStock[];
}

/**
 * @description Handles the request to get the stock.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export async function detailStock(req: Request, res: Response): Promise<void> {
	const {range, interval}: DetailQueryParams = req.query;
	const ticker = encodeURIComponent(req.params.ticker);

	const url = `${BASE_API_URL}/quote/${ticker}?range=${range}&interval=${interval}`;

	try {
		const response = await get(url, defaultHeaders);

		if (!response.ok) throw new Error(await response.json());

		const stock: ResponseDetailStock = await response.json();

		res.status(200).json(stock.results[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error});
	}
}
