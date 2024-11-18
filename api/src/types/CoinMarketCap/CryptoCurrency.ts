import type {Platform} from "./Platform";
import type {Quote} from "./Quote";

interface USDQuote {
	USD: Quote;
}

export interface CryptoCurrency {
	id: number;
	name: string;
	symbol: string;
	slug: string;
	num_market_pairs: number;
	date_added: Date;
	tags: string[];
	max_supply: number;
	circulating_supply: number;
	total_supply: number;
	infinity_supply: boolean;
	platform: Platform | null;
	cmc_rank: number;
	self_reported_circulating_supply: number | null;
	self_reported_market_cap: number | null;
	tvl_ratio: number | null;
	last_updated: Date;
	quote: USDQuote;
	image: string;
}
