import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
    plugins: [ vue(), vueJsx(), vueDevTools() ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [ tailwind(), autoprefixer() ],
        },
    },
    optimizeDeps: {
        include: [
            "vue",
            "vue-router",
            "@vueuse/core",
            "pinia",
            "@storybook/blocks",
            "@storybook/theming",
            "@storybook/addon-links/preview",
            "@storybook/addon-essentials/docs/preview",
            "@storybook/addon-essentials/actions/preview",
            "@storybook/addon-essentials/backgrounds/preview",
            "@storybook/addon-essentials/viewport/preview",
            "@storybook/addon-essentials/measure/preview",
            "@storybook/addon-essentials/outline/preview",
            "@storybook/addon-essentials/highlight/preview",
            "@storybook/addon-interactions/preview",
            "@storybook/addon-actions/decorator",
        ],
    },
});
