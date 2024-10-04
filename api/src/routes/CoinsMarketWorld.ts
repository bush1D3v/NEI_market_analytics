import express from "express";
import { latestList } from "@/proxy/TradingView";

const coinsMarketWorldRoutes = express();

coinsMarketWorldRoutes.get("/your-rest-implementation.com/api/authorize/", latestList);

export default coinsMarketWorldRoutes;
