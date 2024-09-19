import type { App } from "vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enTranslates from "./en/translate.json";

export const DEFAULT_LNG = 'en-US';

i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(Backend)
    .use(LanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        supportedLngs: [ 'pt', 'en' ],
        debug: true,
        load: 'all',
        fallbackLng: 'en-US',
        resources: {
            en: {
                translation: enTranslates,
            },
        },
        backend: {
            loadPath: "/src/locales/{{lng}}/translate.json",
        },
        detection: {
            order: [ 'navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag', 'path', 'subdomain' ],
            caches: [ 'localStorage', 'cookie' ],
        },
    });

export default function (app: App) {
    app.use(I18NextVue, { i18next });
    return app;
}
