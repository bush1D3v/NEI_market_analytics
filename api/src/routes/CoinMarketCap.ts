import express from "express";
import {listingsLatest, detail} from "../proxy/CoinMarketCap.ts";

const coinMarketCapRoutes = express();

coinMarketCapRoutes.get("/v1/cryptocurrency/listings/latest", listingsLatest);
coinMarketCapRoutes.get("/v2/cryptocurrency/info", detail);

export default coinMarketCapRoutes;
