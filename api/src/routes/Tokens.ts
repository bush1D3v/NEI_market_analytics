import express from "express";
import {getCsrfToken} from "../controllers/tokens.ts";

const tokensRoutes = express();

tokensRoutes.get("/csrf-token", getCsrfToken);

export default tokensRoutes;
