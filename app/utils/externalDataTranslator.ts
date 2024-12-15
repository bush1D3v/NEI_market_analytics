import {Translate} from "translate";

export default async function translate(text: string, langFrom?: string) {
	const language = navigator.language.split("-")[0];

	// casos para textos pré-inputados na aplicação e que não desejamos usar i18-next
	if (langFrom) if (language === langFrom) return text;

	// casos para dados vindos de APIs externas
	if (language === "en" && !langFrom) return text;

	const translator = Translate({engine: "google", from: langFrom || "en", to: language});

	const result = await translator(text);

	return result;
}
