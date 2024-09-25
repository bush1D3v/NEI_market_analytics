import type {Platform} from "./Platform";

export interface CryptoCurrency {
	id: number;
	rank: number;
	name: string;
	symbol: string;
	slug: string;
	is_active: number;
	first_historical_data: Date;
	last_historical_data: Date;
	platform: Platform | null;
}
