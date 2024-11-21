import express from "express";
import {detailCrypto, listCryptoCurrencies} from "../proxy/CoinGecko.ts";

const coinGeckoRoutes = express();

coinGeckoRoutes.get("/coins/markets", listCryptoCurrencies);
coinGeckoRoutes.get("/coins/:slug/market_chart/range", detailCrypto);

export default coinGeckoRoutes;
