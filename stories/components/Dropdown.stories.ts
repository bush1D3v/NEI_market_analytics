import type {Meta, StoryObj} from "@storybook/vue3";
import {within, expect} from "@storybook/test";
import Dropdown from "@/components/Dropdown.vue";
import {DropdownMock} from "../../mocks/components/Dropdown";

const meta: Meta<typeof Dropdown> = {
	title: "Components/Dropdown",
	component: Dropdown,
	tags: ["autodocs"],
	parameters: {
		actions: {
			argTypesRegex: "^on.*",
		},
	},
	argTypes: {
		menu: {
			description: "The Menus of the Dropdown",
			example: DropdownMock,
			control: {type: "object"},
		},
		buttonTile: {
			description: "The title of the button",
			example: "Mercados",
			control: {type: "text"},
		},
		label: {
			description: "The label of the button",
			example: "Tópicos",
			control: {type: "text"},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
	name: "Default",
	args: {
		menu: DropdownMock,
		buttonTile: "Mercados",
		label: "Tópicos",
	},
	play: async ({canvasElement, step}) => {
		const canvas = within(canvasElement);

		const DropdownElement = canvas.getByTestId("Dropdown");
		await step("Render the Dropdown", async () => {
			expect(DropdownElement).toBeDefined();
		});
	},
};
