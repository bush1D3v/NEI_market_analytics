import { csrfSync } from "csrf-sync";
import { doubleCsrfOptions } from "../config/csrf.ts";
import type { NextFunction, Request, Response } from "express";

const { generateToken, getTokenFromRequest, storeTokenInState } =
    csrfSync(doubleCsrfOptions);

function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
    const ignoredMethods = [ 'GET', 'HEAD', 'OPTIONS' ];

    if (ignoredMethods.includes(req.method)) {
        return next();
    }

    try {
        const tokenFromRequest = getTokenFromRequest(req);

        if (typeof tokenFromRequest === 'string' && tokenFromRequest.length === 256) {
            next();
        } else {
            throw new Error("Invalid CSRF token");
        }
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: "Invalid CSRF token" });
    }
}

export { verifyCsrfToken, generateToken, storeTokenInState };
