import express from "express";
import { latestList } from "@/proxy/WorldCurrencyList";

const coinsMarketWorldRoutes = express();

coinsMarketWorldRoutes.get("/your-rest-implementation.com/api/authorize/", latestList);

export default coinsMarketWorldRoutes;
