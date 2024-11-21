import express from "express";
import {listStocks, detailStock} from "../proxy/BrapiDev.ts";

const brapiDevRoutes = express();

brapiDevRoutes.get("/quote/list", listStocks);
brapiDevRoutes.get("/quote/:ticker", detailStock);

export default brapiDevRoutes;
