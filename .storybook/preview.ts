import {themes} from "@storybook/theming";
import {withActions} from "@storybook/addon-actions/decorator";
import type {Preview} from "@storybook/vue3";
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
					value: "#333333",
				},
				{
					name: "light",
					value: "#eeeeee",
				},
			],
		},
	},
	tags: ["autodocs"],
	decorators: [withActions],
};

export default preview;
