// number 1: Date
// number 2: Data
export type GeneralData = [number, number];

export interface CryptoDataDescription {
	id: string;
	symbol: string;
	name: string;
	web_slug: string;
	categories: string[];
	description: {en: string};
	links: {
		homepage: string[];
		whitepaper: string;
		blockchain_site: string[];
		official_forum_url: string[];
		repos_url: {github: string[]};
	};
	image: {
		thumb: string;
		small: string;
		large: string;
	};
	sentiment_votes_up_percentage: number;
	sentiment_votes_down_percentage: number;
	watchlist_portfolio_users: number;
	market_cap_rank: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	price_change_percentage_14d: number;
	price_change_percentage_30d: number;
	price_change_percentage_60d: number;
	price_change_percentage_200d: number;
	price_change_percentage_1y: number;
	market_cap_change_percentage_24h: number;
}

export interface CryptoGraphDetail {
	prices: GeneralData[];
	market_caps: GeneralData[];
	total_volumes: GeneralData[];
}

export interface CryptoCompleted {
	prices: GeneralData[];
	market_caps: GeneralData[];
	total_volumes: GeneralData[];
	description: CryptoDataDescription;
}
