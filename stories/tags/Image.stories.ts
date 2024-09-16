import type {Meta, StoryObj} from "@storybook/vue3";
import {within, expect} from "@storybook/test";
import Image from "@/tags/Image.vue";
import {ImageMock} from "../../mocks/components/tags/Image";

const meta: Meta<typeof Image> = {
	title: "Components/Tags/Image",
	component: Image,
	tags: ["autodocs"],
	parameters: {
		actions: {
			argTypesRegex: "^on.*",
		},
	},
	argTypes: {
		alt: {
			description: "The alt of the image",
			example: "image",
			control: {type: "text"},
		},
		height: {
			description: "The height of the image",
			example: "80",
			control: {type: "text"},
		},
		width: {
			description: "The width of the image",
			example: "80",
			control: {type: "text"},
		},
		src: {
			description: "The source of the image",
			example: "https://via.placeholder.com/80",
			control: {type: "text"},
		},
		class: {
			description: "The class of the image",
			example: "w-20 h-20",
			control: {type: "text"},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
	name: "Default",
	args: ImageMock,
	play: async ({canvasElement, step}) => {
		const canvas = within(canvasElement);

		const ImageElement = canvas.getByTestId("Image");
		await step("Render the Image", async () => {
			expect(ImageElement).toBeDefined();
		});

		const ImageStyle = getComputedStyle(ImageElement);
		await step("Verify the initial Image style", async () => {
			expect(ImageStyle.height).toBe(`${ImageMock.height}px`);
			expect(ImageStyle.width).toBe(`${ImageMock.width}px`);
		});

		const ImageAlt = ImageElement.getAttribute("alt");
		await step("Verify the Image alt", async () => {
			expect(ImageAlt).toBe(ImageMock.alt);
		});

		const ImageSrc = ImageElement.getAttribute("src");
		await step("Verify the Image src", async () => {
			expect(ImageSrc).toBe(ImageMock.src);
		});

		const ImageClass = ImageElement.getAttribute("class");
		await step("Verify the Image class", async () => {
			expect(ImageClass).toBe(ImageMock.class);
		});
	},
};
