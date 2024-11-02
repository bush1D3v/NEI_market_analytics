import type {Platform} from "./Platform";
import type {Quote} from "./Quote";

interface BRLQuote {
	BRL: Quote;
}

export interface StocksCurrency {
	currentPrice: number; // Preço atual
	targetHighPrice: number; // Preço alvo alto
	targetLowPrice: number; // Preço alvo baixo
	targetMeanPrice: number; // Preço alvo médio
	targetMedianPrice: number; // Preço alvo mediano
	recommendationMean: number; // Recomendação média
	recommendationKey: string; // Recomendação
	financialCurrency: string; // Moeda
	symbol: string; // Símbolo da ação
	currency: string; // Moeda em que a ação é negociada
	marketCap: number; // Capitalização de mercado da empresa
	shortName: string; // Nome curto da empresa
	longName: string; // Nome completo da empresa
	regularMarketPrice: number; // Preço atual da ação
	logourl: string; // URL do logotipo da empresa
}
