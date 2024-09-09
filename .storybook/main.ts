import type {StorybookConfig} from "@storybook/vue3-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.ts"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@chromatic-com/storybook",
	],
	framework: {
		name: "@storybook-vue/vue3",
		options: {
			docgen: "vue-component-meta",
		},
	},
	docs: {
		autodocs: "tag",
	},
	staticDirs: ["../public"],
};
export default config;
