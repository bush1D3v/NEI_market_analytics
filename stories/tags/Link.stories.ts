import type {Meta, StoryObj} from "@storybook/vue3";
import {within, expect} from "@storybook/test";
import Link from "@/tags/Link.vue";
import {LinkMock} from "../../mocks/components/tags/Link";

const meta: Meta<typeof Link> = {
	title: "Components/Tags/Link",
	component: Link,
	tags: ["autodocs"],
	parameters: {
		actions: {
			argTypesRegex: "^on.*",
		},
	},
	argTypes: {
		href: {
			description: "The href of the link",
			example: "https://www.google.com",
			control: {type: "text"},
		},
		target: {
			description: "The target of the link",
			example: "_blank",
			control: {type: "select"},
			options: ["_blank", "_self", "_parent", "_top"],
		},
		class: {
			description: "The class of the link",
			example: "text-blue",
			control: {type: "text"},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
	name: "Default",
	args: {...LinkMock, default: "Click here"},
	play: async ({canvasElement, step}) => {
		const canvas = within(canvasElement);

		const LinkElement = canvas.getByTestId("Link");
		await step("Render the Link", async () => {
			expect(LinkElement).toBeDefined();
		});

		const LinkClass = LinkElement.getAttribute("class");
		await step("Verify the Link class", async () => {
			expect(LinkClass).toBe(LinkMock.class);
		});

		const LinkHref = LinkElement.getAttribute("href");
		await step("Verify the Link href", async () => {
			expect(LinkHref).toBe(LinkMock.href);
		});

		const LinkTarget = LinkElement.getAttribute("target");
		await step("Verify the Link target", async () => {
			expect(LinkTarget).toBe(LinkMock.target);
		});

		const LinkRel = LinkElement.getAttribute("rel");
		await step("Verify the Link rel", async () => {
			expect(LinkRel).toBe("no-referrer");
		});
	},
};
