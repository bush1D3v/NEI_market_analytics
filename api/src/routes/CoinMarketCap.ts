import express from "express";
import { listingsLatest } from "../proxy/CoinMarketCap.ts";

const coinMarketCapRoutes = express();

coinMarketCapRoutes.get("/v1/cryptocurrency/listings/latest", listingsLatest);

export default coinMarketCapRoutes;
