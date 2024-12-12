import type {CsrfSyncOptions} from "csrf-sync";

export const doubleCsrfOptions: CsrfSyncOptions = {
	ignoredMethods: ["GET", "HEAD", "OPTIONS"],
	getTokenFromState: (req) => {
		return req.session.csrfToken;
	},
	getTokenFromRequest: (req) => {
		const token = req?.headers["x-csrf-token"];
		return Array.isArray(token) ? token[0] : token;
	},
	storeTokenInState: (req, token) => {
		req.session.csrfToken = token;
	},
	size: 128,
};
