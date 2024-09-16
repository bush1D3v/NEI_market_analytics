import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect } from "@storybook/test";
import Header from "@/components/Layout/Header.vue";

const meta: Meta<typeof Header> = {
    title: "Components/Layout/Header",
    component: Header,
    tags: [ "autodocs" ],
    parameters: {
        actions: {
            argTypesRegex: "^on.*",
        },
    },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
    name: "Default",
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const HeaderElement = canvas.getByTestId("Header");
        await step("Render the Header", async () => {
            expect(HeaderElement).toBeDefined();
        });

        const HeaderClass = HeaderElement.getAttribute("class");
        await step("Verify the Header class", async () => {
            expect(HeaderClass).toBe("layout container justify-center min-w-full border-b");
        });
    },
};
