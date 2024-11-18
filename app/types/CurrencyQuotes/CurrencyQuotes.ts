import type {Rates} from "./Rates";

export interface CurrencyQuotes {
	table: string;
	rates: Rates;
	lastupdate: string; // ISO 8601 date string
}
