import type {HistoricalDataPrice} from "./HistoricalDataPrice";

export interface SummaryProfile {
	address1: string;
	address2?: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone: string;
	fax?: string;
	website: string;
	industry: string;
	industryKey: string;
	industryDisp: string;
	sector?: string;
	sectorKey?: string;
	sectorDisp?: string;
	longBusinessSummary?: string;
	fullTimeEmployees?: number;
	priceEarnings?: number;
	earningsPerShare?: number;
	logourl?: string;
}

export interface DetailedStock {
	currency: string;
	marketCap?: number;
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
	summaryProfile: SummaryProfile;
}
