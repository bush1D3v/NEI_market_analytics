import type {Request, Response} from "express";
import {get} from "../helpers/HttpClient.ts";
import dotenv from "dotenv";
import type {New} from "../types/Finnhub/New.ts";
dotenv.config();

const BASE_API_URL = process.env.FINNHUB_HOST as string;
const API_KEY = process.env.FINNHUB_KEY as string;

const defaultHeaders = {
	"X-Finnhub-Token": API_KEY,
};

/**
 * @description Handles the request to get the list of market news.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export async function listMarketNews(req: Request, res: Response): Promise<void> {
	const {category} = req.query;
	const url = `${BASE_API_URL}/api/v1/news?category=${category}`;

	try {
		const response = await get(url, defaultHeaders);

		if (!response.ok) throw new Error(await response.json());

		const jsonData: New[] = await response.json();

		res.json(jsonData);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error});
	}
}
