import cors from "cors";

const corsOptions = {
	origin: ["http://localhost:5173"],
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Accept-Encoding",
		"Accept",
		"referrer-policy",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

export default cors(corsOptions);
