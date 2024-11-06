import corsConfig from "./config/cors.ts";
import express from "express";
import coinMarketCapRoutes from "./routes/CoinMarketCap.ts";
import brapiDevRoutes from "./routes/BrapiDev.ts";
import currencyQuotesRoutes from "./routes/CurrencyQuotes.ts";
import finnhubRoutes from "./routes/Finnhub.ts";

const app = express();

app.use(corsConfig);
app.use(express.json());
app.use(coinMarketCapRoutes);
app.use(brapiDevRoutes);
app.use(currencyQuotesRoutes);
app.use(finnhubRoutes);

export default app;
