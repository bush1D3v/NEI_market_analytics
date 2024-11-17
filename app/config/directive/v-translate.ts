import type {DirectiveBinding} from "vue";
import {t} from "i18next";

function translateText(el: HTMLElement, binding: DirectiveBinding) {
	const key = binding.value || el.innerText;
	if (!key) return;

	const translation = t(key);
	if (translation === key) return;

	el.innerText = translation;
}

export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		translateText(el, binding);
	},
};
