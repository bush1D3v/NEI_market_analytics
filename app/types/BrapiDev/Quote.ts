export interface Quote {
	name: string; // Nome do ticker
	close: number; // Preço de fechamento
	change: number; // Variação percentual
	change_abs: number; // Variação no preço absoluto
	volume: number; // Volume de negociação
	market_cap_basic: number; // Capitalização de mercado
	sector: string; // Setor da ação
}
