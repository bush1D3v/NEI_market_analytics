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
		chat_url: string[];
		announcement_url: string[];
		subreddit_url: string;
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
	market_data: {
		current_price: {
			usd: number;
		};
		market_cap: {
			usd: number;
		};
		total_volume: {
			usd: number;
		};
		price_change_percentage_24h: number;
		market_cap_change_percentage_24h: number;
	};
	tickers: {
		target: string;
		market: {
			name: string;
			identifier: string;
			has_trading_incentive: boolean;
			has_referral_params: boolean;
		};
		last: number;
		volume: number;
		converted_last: {
			btc: number;
			eth: number;
			usd: number;
		};
		converted_volume: {
			btc: number;
			eth: number;
			usd: number;
		};
		trust_score: string;
		bid_ask_spread_percentage: number;
		timestamp: string;
		last_traded_at: string;
		last_fetch_at: string;
		is_anomaly: boolean;
		is_stale: boolean;
		trade_url: string;
		token_info_url: string | null;
		coin_id: string;
		target_coin_id: string;
	}[];
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
