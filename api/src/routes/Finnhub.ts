import express from "express";
import {listMarketNews} from "../proxy/Finnhub.ts";

const finnhubRoutes = express();

finnhubRoutes.get("/api/v1/news", listMarketNews);

export default finnhubRoutes;
