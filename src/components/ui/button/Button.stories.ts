import type {Meta, StoryObj} from "@storybook/vue3";
import {userEvent, within, expect} from "@storybook/test";
import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
	title: "Components/Shadcn/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		actions: {
			argTypesRegex: "^on.*",
		},
	},
	argTypes: {
		default: {
			description: "The content of the button.",
			control: {type: "text"},
		},
		variant: {
			description: "The variant of the button.",
			control: {type: "select"},
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
		},
		size: {
			description: "The size of the button.",
			control: {type: "select"},
			options: ["default", "xs", "sm", "lg", "icon"],
		},
		class: {
			description: "Additional Tailwind classes for the button.",
			control: {type: "text"},
		},
		style: {
			description: "Additional CSS styles for the button.",
			control: {type: "text"},
		},
		as: {
			description: "The HTML tag to use for the button.",
			control: {type: "text"},
		},
		asChild: {
			description: "Whether to render the button as a child of another element.",
			control: {type: "boolean"},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	name: "Default",
	args: {
		default: "Button",
		variant: "default",
		size: "default",
		class: "bg-red-500",
		as: "button",
		style: "",
		asChild: false,
	},
	play: async ({canvasElement, step}) => {
		const canvas = within(canvasElement);

		const buttonElement = canvas.getByTestId("ButtonSCN");
		await step("Render the button", async () => {
			expect(buttonElement).toBeDefined();
		});

		const buttonStyle = getComputedStyle(buttonElement);
		await step("Verify the initial button style", async () => {
			expect(buttonStyle.backgroundColor).toBe("rgb(239, 68, 68)");
			expect(buttonStyle.color).toBe("rgb(250, 250, 249)");
		});

		await step("Click the button", async () => {
			await userEvent.click(buttonElement);
		});

		await step("Hover the button", async () => {
			await userEvent.hover(buttonElement);
		});
	},
};
