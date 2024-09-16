import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect } from "@storybook/test";
import Footer from "@/components/Layout/Footer.vue";

const meta: Meta<typeof Footer> = {
    title: "Components/Layout/Footer",
    component: Footer,
    tags: [ "autodocs" ],
    parameters: {
        actions: {
            argTypesRegex: "^on.*",
        },
    },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
    name: "Default",
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const FooterElement = canvas.getByTestId("Footer");
        await step("Render the Footer", async () => {
            expect(FooterElement).toBeDefined();
        });

        const FooterClass = FooterElement.getAttribute("class");
        await step("Verify the Footer class", async () => {
            expect(FooterClass).toBe("layout container justify-center min-w-full border-t");
        });
    },
};
