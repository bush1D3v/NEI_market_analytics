import corsConfig from "./config/cors.ts";
import express from "express";
import brapiDevRoutes from "./routes/BrapiDev.ts";
import currencyQuotesRoutes from "./routes/CurrencyQuotes.ts";
import coinGeckoRoutes from "./routes/CoinGecko.ts";
import finnhubRoutes from "./routes/Finnhub.ts";
import helmet from "./config/helmet.ts";
import rateLimiter from "./config/rateLimiter.ts";
import {csrfProtection, setCsrfToken, cookieParser} from "./config/csrf.ts";

const app = express();

app.use(corsConfig);
app.use(helmet);
app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);
app.use(setCsrfToken);

app.use(coinGeckoRoutes);
app.use(brapiDevRoutes);
app.use(currencyQuotesRoutes);
app.use(finnhubRoutes);

export default app;
