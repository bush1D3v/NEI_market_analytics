import {onMounted, onUpdated} from "vue";
import vTranslate from "../directive/v-translate";

export function useTranslation() {
	const applyTranslation = () => {
		const tagsToTranslate = ["span", "p", "h1", "h2", "h3", "button"];

		for (const tag of tagsToTranslate) {
			const elements = document.querySelectorAll(tag);
			for (const el of elements) {
				if (el.closest(".accordion")) {
					continue;
				}
				vTranslate.mounted(el as HTMLElement, {
					value: (el as HTMLElement).innerText,
					instance: null,
					oldValue: undefined,
					modifiers: {},
					dir: vTranslate,
				});
			}
		}
	};

	onMounted(applyTranslation);
	onUpdated(applyTranslation);
}
