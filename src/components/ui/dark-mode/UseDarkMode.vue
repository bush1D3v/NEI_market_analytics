<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { watchEffect, ref } from "vue";
import { Icon } from "@iconify/vue";
const savedTheme = localStorage.getItem("theme");
const isDark = ref(savedTheme === "dark" || savedTheme === null);
// Função para alternar o tema
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
    <button @click="toggleDark()" aria-label="Toggle dark mode">
        
        <a v-if="isDark">🌙</a>
        <a v-else>🌞</a>
    </button>
</template>

<style>
body{
    transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out;
}
body.dark {
    background: #f7fafd;
    color: #1f2137;
}

button {
    background: none;
    border: none;
    cursor: pointer;
}

button:focus {
    outline: none;
}

</style>
