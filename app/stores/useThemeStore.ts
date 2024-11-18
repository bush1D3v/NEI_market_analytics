import {defineStore} from "pinia";
import {ref, watchEffect, computed} from "vue";

export const useThemeStore = defineStore("theme", () => {
	const savedTheme = localStorage.getItem("theme");
	const isDark = ref(savedTheme === "dark" || savedTheme === null);

	watchEffect(() => {
		if (isDark.value) {
			document.body.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.body.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	});

	function toggleDark() {
		isDark.value = !isDark.value;
	}

	const theme = computed(() => isDark.value);

	return {isDark, toggleDark, theme};
});
