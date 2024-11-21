import type {HistoricalDataPrice} from "./HistoricalDataPrice";

export interface DetailedStock {
	currency: string;
	shortName: string;
	longName: string;
	regularMarketChange: number;
	regularMarketChangePercent: number;
	regularMarketTime: string;
	regularMarketPrice: number;
	regularMarketDayHigh: number;
	regularMarketDayRange: string;
	regularMarketDayLow: number;
	regularMarketVolume: number;
	regularMarketPreviousClose: number;
	regularMarketOpen: number;
	fiftyTwoWeekRange: string;
	fiftyTwoWeekLow: number;
	fiftyTwoWeekHigh: number;
	symbol: string;
	usedInterval: string;
	usedRange: string;
	historicalDataPrice: HistoricalDataPrice[];
	validRanges: string[];
	validIntervals: string[];
	priceEarnings: number | null;
	earningsPerShare: number;
	logourl: string;
}
