import express from "express";
import {
	detailCryptoMarketChart,
	detailCryptoDescriptionData,
	listCryptoCurrencies,
} from "../proxy/CoinGecko.ts";

const coinGeckoRoutes = express();

coinGeckoRoutes.get("/coins/markets", listCryptoCurrencies);
coinGeckoRoutes.get("/coins/:slug/market_chart/range", detailCryptoMarketChart);
coinGeckoRoutes.get("/coins/:slug", detailCryptoDescriptionData);

export default coinGeckoRoutes;
