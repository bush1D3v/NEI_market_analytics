import rateLimit from "express-rate-limit";
import {rateLimiterOptions} from "../config/rateLimiter.ts";

const rateLimiter = rateLimit(rateLimiterOptions);

export default rateLimiter;
