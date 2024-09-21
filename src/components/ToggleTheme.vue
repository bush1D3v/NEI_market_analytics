<script setup>
import {useToggle} from "@vueuse/core";
import {watchEffect, ref} from "vue";

const savedTheme = localStorage.getItem("theme");
const isDark = ref(savedTheme === "dark" || savedTheme === null);
const toggleDark = useToggle(isDark);

watchEffect(() => {
	if (isDark.value) {
		document.body.classList.add("dark");
		localStorage.setItem("theme", "dark");
	} else {
		document.body.classList.remove("dark");
		localStorage.setItem("theme", "light");
	}
});
</script>

<template>
    <label htmlFor="button-theme" aria-label="Change Theme" aria-labelledby="sunMoon" id="switch"
        className="mr-8 min-[900px]:mr-0">
        <input type="checkbox" :checked="!isDark" @click="toggleDark()" aria-label="Change Theme" id="button-theme" />
        <span id="sunMoon" aria-label="Change Theme"></span>
    </label>
</template>

<style scoped>
#switch {
    font-size: 12px;
    position: relative;
    width: 4em;
    height: 2.2em;
}

#switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

#switch input:checked+#sunMoon {
    background-color: #fff;
    box-shadow: 3px -5px 8px -1px rgba(0, 0, 0, 0.2);
}

#switch input:checked+#sunMoon:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px var(--yellow);
    bottom: 13%;
}

#sunMoon {
    width: 48px;
    height: 28px;
    position: absolute;
    cursor: pointer;
    background-color: #232425;
    transition: background-color 0.5s, box-shadow 0.5s;
    border-radius: 30px;
}

#sunMoon:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.4em;
    border-radius: 50%;
    left: 15%;
    bottom: 18%;
    box-shadow: inset 8px -4px 0px 0px var(--yellow);
    transition: transform 0.5s, box-shadow 0.5s, bottom 0.5s;
}
</style>
