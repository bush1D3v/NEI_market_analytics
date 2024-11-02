import express from "express";
import { listStocks } from "../proxy/BrapiDev.ts";

const brapiDevRoutes = express();

brapiDevRoutes.get("/api/quote/list", listStocks);

export default brapiDevRoutes;
