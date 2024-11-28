import type { Request, Response } from "express";
import { generateToken } from "../middlewares/csrf.ts";

/**
 * @description Handles the request to get the CSRF token.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export function getCsrfToken(req: Request, res: Response): void {
    try {
        const csrfToken = generateToken(req, true);
        res.json({ csrfToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}
