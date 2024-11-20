import express from "express";
import { detailCrypto } from "../proxy/CoinGecko.ts";

const coinGeckoRoutes = express();

coinGeckoRoutes.get("/coins/:slug/market_chart/range", detailCrypto);

export default coinGeckoRoutes;
