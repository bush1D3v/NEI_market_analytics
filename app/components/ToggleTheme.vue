<script setup lang="ts">
import {useThemeStore} from "@/stores/useThemeStore";

export interface ToggleThemeProps {
	variant: "switch" | "airplane";
}

const props = defineProps<ToggleThemeProps>();

const themeStore = useThemeStore();
</script>

<template>
    <label v-if="props.variant === 'switch'" htmlFor="button-theme-switch" aria-label="Change Theme"
        aria-labelledby="sunMoon" id="switch" class="min-[900px]:mr-0" data-testid="ToggleTheme">
        <input type="checkbox" :checked="!themeStore.theme" @click="themeStore.toggleDark()" aria-label="Change Theme"
            id="button-theme-switch" />
        <span id="sunMoon" aria-label="Change Theme"></span>
    </label>
    <label v-else htmlFor="button-theme-airplane" aria-label="Change Theme" aria-labelledby="airplane"
        id="airplaneLabel" class="min-[900px]:mr-0" data-testid="ToggleTheme">
        <input type="checkbox" :checked="!themeStore.theme" @click="themeStore.toggleDark()" aria-label="Change Theme"
            id="button-theme-airplane" />
        <span id="airplane" aria-label="Change Theme"></span>
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
    box-shadow: inset 15px -4px 0px 15px #3b3d3f;
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
    box-shadow: inset 8px -4px 0px 0px var(--text);
    transition: transform 0.5s, box-shadow 0.5s, bottom 0.5s;
}

#airplaneLabel {
    font-size: 12px;
    position: relative;
    width: 4em;
    height: 2.2em;
}

#airplaneLabel input {
    opacity: 0;
    width: 0;
    height: 0;
}

#airplaneLabel input:checked+#airplane {
    background-color: #c6d2df;
    box-shadow: 3px -5px 8px -1px #00000033;
}

#airplaneLabel input:checked+#airplane:before {
    transform: translateX(100%);
    box-shadow: inset 10px -5px 0px 15px white;
    bottom: 18%;
}

#airplane {
    width: 48px;
    height: 28px;
    position: absolute;
    cursor: pointer;
    background-color: #157efb;
    transition: background-color 0.5s, box-shadow 0.5s;
    border-radius: 30px;
}

#airplane:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.4em;
    border-radius: 50%;
    left: 15%;
    bottom: 18%;
    box-shadow: inset 15px -4px 0px 15px white;
    transition: transform 0.5s, box-shadow 0.5s, bottom 0.5s;
}
</style>
