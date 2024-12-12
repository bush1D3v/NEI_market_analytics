import type {CorsOptions} from "cors";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

export const corsOptions: CorsOptions = {
	origin: [`${CLIENT_HOST}:${CLIENT_PORT}`],
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Accept-Encoding",
		"Accept",
		"referrer-policy",
		"x-csrf-token",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};
