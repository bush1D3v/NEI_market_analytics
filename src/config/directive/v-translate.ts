import type { DirectiveBinding } from "vue";
import { t } from "i18next";

function translateText(el: HTMLElement, binding: DirectiveBinding) {
    const key = binding.value || el.innerText;
    el.innerText = t(key);
}

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        translateText(el, binding);
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        translateText(el, binding);
    },
};
