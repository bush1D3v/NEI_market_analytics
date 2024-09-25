import express from "express";
import { getMap } from "../proxy/CoinMarketCap.ts";

const coinMarketCapRoutes = express();

coinMarketCapRoutes.get("/v1/cryptocurrency/map", getMap);

export default coinMarketCapRoutes;
