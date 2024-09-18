import type {App} from "vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import enTranslates from "./en/translate.json";

i18next
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	.use(Backend)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		fallbackLng: "en",
		resources: {
			en: {
				translation: enTranslates,
			},
		},
		backend: {
			loadPath: "/src/locales/{{lng}}/translate.json",
		},
	});

export default function (app: App) {
	app.use(I18NextVue, {i18next});
	return app;
}
