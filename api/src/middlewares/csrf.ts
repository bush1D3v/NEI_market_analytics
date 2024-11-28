import { csrfSync } from "csrf-sync";
import { doubleCsrfOptions } from "../config/csrf.ts";
import type { NextFunction, Request, Response } from "express";

const { isRequestValid, generateToken } = csrfSync(doubleCsrfOptions);

function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
    try {
        isRequestValid(req)
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });

    }
}

export { verifyCsrfToken, generateToken };
