import csrf from "csurf";
import cookieParser from "cookie-parser";
import type { Request, Response, NextFunction } from "express";

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1h
    },
});

const setCsrfToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token);
    next();
};

export { csrfProtection, setCsrfToken, cookieParser };
