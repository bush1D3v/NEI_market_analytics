import type {Request, Response} from "express";
import {get} from "../helpers/HttpClient.ts";
import dotenv from "dotenv";
import type {Stock} from "../types/BrapiDev/Stock.ts";
import type {SortBy} from "../types/BrapiDev/SortBy.ts";
import type {SortOrder} from "../types/BrapiDev/SortOrder.ts";
dotenv.config();

const BASE_API_URL = process.env.BRAPI_HOST as string;
const API_KEY = process.env.BRAPI_KEY as string;

const defaultHeaders = {
	"Accept-Encoding": "deflate, gzip",
	"referrer-policy": "origin-when-cross-origin",
	"X-Api-Key": API_KEY,
};

interface QueryParams {
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
	const {limit = 12, page = 1, sortBy, sortOrder}: QueryParams = req.query;

	let url: string;

	if (sortBy && sortOrder) {
		url = `${BASE_API_URL}/api/quote/list?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
	} else {
		url = `${BASE_API_URL}/api/quote/list?limit=${limit}&page=${page}`;
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
