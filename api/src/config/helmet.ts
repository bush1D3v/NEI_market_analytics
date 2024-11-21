import helmet from "helmet";

export default helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [ "'self'" ],
            scriptSrc: [ "'self'" ],
            styleSrc: [ "'self'" ],
            imgSrc: [
                "'self'",
                "https://api.coingecko.com/api/v3",
                "https://static2.finnhub.io",
                "https://s3-symbol-logo.tradingview.com",
            ],
            connectSrc: [
                "'self'",
                "https://api.coingecko.com/api/v3",
                "https://brapi.dev",
                "https://cdn.moeda.info",
                "https://finnhub.io",
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
});
