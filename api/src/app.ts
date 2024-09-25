import corsConfig from "./config/cors.ts";
import express from "express";
import coinMarketCapRoutes from "./routes/CoinMarketCap.ts";

const app = express();

app.use(corsConfig);
app.use(express.json());
app.use(coinMarketCapRoutes);

export default app;
