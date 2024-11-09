import express from "express";
import { listCompanyNews, listMarketNews } from "../proxy/Finnhub.ts";

const finnhubRoutes = express();

finnhubRoutes.get("/api/v1/news", listMarketNews);
finnhubRoutes.get("/api/v1/company-news", listCompanyNews);

export default finnhubRoutes;
