import express from "express";
import cookieParser from "cookie-parser";
import cors from "./middlewares/cors.ts";
import helmet from "./middlewares/helmet.ts";
import rateLimiter from "./middlewares/rateLimiter.ts";
import brapiDevRoutes from "./routes/BrapiDev.ts";
import currencyQuotesRoutes from "./routes/CurrencyQuotes.ts";
import coinGeckoRoutes from "./routes/CoinGecko.ts";
import finnhubRoutes from "./routes/Finnhub.ts";
import generativeAIRoutes from "./routes/Gemini.ts";
import tokensRoutes from "./routes/Tokens.ts";
import session from "express-session";
import {verifyCsrfToken} from "./middlewares/csrf.ts";

const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie-secret";

const app = express();

app.use(express.json());
app.use(cors);
app.use(helmet);
app.use(rateLimiter);
app.use(cookieParser(COOKIE_SECRET));
app.use(
	session({
		secret: COOKIE_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 60000,
		},
	}),
);
app.use(tokensRoutes);
app.use(verifyCsrfToken);

app.use(coinGeckoRoutes);
app.use(brapiDevRoutes);
app.use(currencyQuotesRoutes);
app.use(finnhubRoutes);
app.use(generativeAIRoutes);

export default app;
