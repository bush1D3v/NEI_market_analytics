import type { HelmetOptions } from "helmet";

export const helmetConfig: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [ "'self'" ],
            scriptSrc: [ "'self'" ],
            styleSrc: [ "'self'" ],
            imgSrc: [
                "'self'",
                "https://coin-images.coingecko.com",
                "https://static2.finnhub.io",
                "https://brapi.dev",
            ],
            connectSrc: [
                "'self'",
                "https://api.coingecko.com",
                "https://brapi.dev",
                "https://cdn.moeda.info",
                "https://finnhub.io",
                "https://generativelanguage.googleapis.com",
            ],
            fontSrc: [ "'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com" ],
            objectSrc: [ "'none'" ],
            upgradeInsecureRequests: [],
        },
        reportOnly: true,
        useDefaults: false,
    },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "sameorigin" },
    hidePoweredBy: true,
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: {
        permittedPolicies: "master-only",
    },
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
    crossOriginEmbedderPolicy: { policy: "unsafe-none" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    originAgentCluster: true,
};
