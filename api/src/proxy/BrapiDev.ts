import type {Request, Response} from "express";
import {get} from "../helpers/HttpClient.ts";
import dotenv from "dotenv";
import {StocksCurrency} from "../types/BrapiDev.ts/StocksCurrency.ts";
dotenv.config();

const BASE_API_URL = process.env.BRAPIDEV_HOST as string;
const API_KEY = process.env.BRAPIDEV_KEY as string;

const defaultHeaders = {
	"Accept-Encoding": "deflate, gzip",
	"referrer-policy": "origin-when-cross-origin",
	"X-Api-Key": API_KEY,
};

interface QueryParams {
	limit?: number;
	page?: number;
}

interface ResponseData {
	data: StocksCurrency[];
}

export async function listStocks(req: Request, res: Response): Promise<void> {
	const {limit = 12, page = 1}: QueryParams = req.query;
	try {
		const response = await get(
			`${BASE_API_URL}/api/quote/list?search=TR&sortBy=close&sortOrder=desc&limit=${limit}&sector=finance`,
			defaultHeaders,
		);
		const jsonData: ResponseData = await response.json();

		if (!response.ok) {
			throw new Error(jsonData.error);
		}

		res.status(200).json(jsonData.data);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error.message});
	}
}
