import type {Request, Response} from "express";
import {get} from "../helpers/HttpClient.ts";
import type {CurrencyQuotes} from "../types/CurrencyQuotes/CurrencyQuotes.ts";

const BASE_API_URL = process.env.CURRENCYQUOTES_HOST as string;

/**
 * @description Handles the request to get the list of currency quotes.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export async function listCurrencyQuotes(req: Request, res: Response): Promise<void> {
	const url = `${BASE_API_URL}/api/latest.json`;

	try {
		const response = await get(url);

		if (!response.ok) throw new Error(await response.json());

		const jsonData: CurrencyQuotes = await response.json();

		res.json(jsonData);
	} catch (error) {
		console.error(error);
		res.status(500).json({error: error});
	}
}
