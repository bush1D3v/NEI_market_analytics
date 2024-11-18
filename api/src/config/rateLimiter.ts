import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: "Too many requests from this IP, please try again after 15 minutes",
	headers: true,
});

export default rateLimiter;
