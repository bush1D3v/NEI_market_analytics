import type { App } from "vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enTranslates from "./en/translate.json";
import esTranslates from "./es/translate.json";
import ptTranslates from "./pt/translate.json";

export const DEFAULT_LNG = "pt-BR";

i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
        supportedLngs: [
            "pt-BR",
            "pt",
            "es",
            "en",
            "en-US",
            "en-GB",
            "en-CA",
            "en-AU",
            "en-NZ",
            "en-IN",
            "en-ZA",
            "en-IE",
            "en-SG",
        ],
        debug: true,
        load: "all",
        fallbackLng: DEFAULT_LNG,
        resources: {
            es: {
                translation: esTranslates,
            },
            pt: {
                translation: ptTranslates,
            },
            en: {
                translation: enTranslates,
            },
            "en-US": {
                translation: enTranslates,
            },
            "en-GB": {
                translation: enTranslates,
            },
            "en-CA": {
                translation: enTranslates,
            },
            "en-AU": {
                translation: enTranslates,
            },
            "en-NZ": {
                translation: enTranslates,
            },
            "en-IN": {
                translation: enTranslates,
            },
            "en-ZA": {
                translation: enTranslates,
            },
            "en-IE": {
                translation: enTranslates,
            },
            "en-SG": {
                translation: enTranslates,
            },
        },
        backend: {
            loadPath: "/app/locales/{{lng}}/translate.json",
        },
        detection: {
            order: [
                "navigator",
                "querystring",
                "cookie",
                "localStorage",
                "htmlTag",
                "path",
                "subdomain",
            ],
            caches: [ "localStorage", "cookie" ],
        },
    });

export default function (app: App) {
    app.use(I18NextVue, { i18next });
    return app;
}
