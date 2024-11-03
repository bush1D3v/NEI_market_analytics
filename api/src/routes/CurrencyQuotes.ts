import express from "express";
import {listCurrencyQuotes} from "../proxy/CurrencyQuotes.ts";

const currencyQuotesRoutes = express();

currencyQuotesRoutes.get("/api/latest.json", listCurrencyQuotes);

export default currencyQuotesRoutes;
