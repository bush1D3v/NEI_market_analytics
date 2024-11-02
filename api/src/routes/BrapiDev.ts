// import express from "express";
// import {listLatest} from "../proxy/BrapiDev.ts";

// const brapiDevRoutes = express();

// brapiDevRoutes.get("/stocks", listLatest);

// export default brapiDevRoutes;

import express from "express";
import { listStocks } from "../proxy/BrapiDev.ts";

const brapiDevRoutes = express();

brapiDevRoutes.get("/stocks", listStocks);

export default brapiDevRoutes;
