// number 1: Date
// number 2: Data
export type GeneralData = [number, number];

export interface CryptoDetail {
	prices: GeneralData[];
	market_caps: GeneralData[];
	total_volumes: GeneralData[];
}
