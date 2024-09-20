import {themes} from "@storybook/theming";
import {withActions} from "@storybook/addon-actions/decorator";
import type {Preview} from "@storybook/vue3";
import {vueRouter} from "storybook-vue3-router";
import "../src/assets/css/main.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			theme: themes.dark,
		},
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "#0f101d",
				},
				{
					name: "light",
					value: "#eeeeee",
				},
			],
		},
	},
	tags: ["autodocs", "autodocs"],
	decorators: [
		withActions,
		vueRouter(),
		(story) => ({
			components: {story},
			template: `
                <div style="display: flex; justify-content: center; align-items: center; width: 50dvw; height: 50dvh;">
                    <story />
                </div>
            `,
		}),
	],
};

export default preview;
