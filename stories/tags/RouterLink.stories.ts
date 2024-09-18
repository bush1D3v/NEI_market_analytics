import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect } from "@storybook/test";
import RouterLink from "@/tags/RouterLink.vue";
import { RouterLinkMock } from "../../mocks/components/tags/RouterLink";

const meta: Meta<typeof RouterLink> = {
    title: "Components/Tags/RouterLink",
    component: RouterLink,
    tags: [ "autodocs" ],
    parameters: {
        actions: {
            argTypesRegex: "^on.*",
        },
    },
    argTypes: {
        to: {
            description: "The router ref of the RouterLink",
            example: "/about-us",
            control: { type: "text" },
        },
        class: {
            description: "The class of the RouterLink",
            example: "text-blue",
            control: { type: "text" },
        },
    },
};

export default meta;

type Story = StoryObj<typeof RouterLink>;

export const Default: Story = {
    name: "Default",
    args: { ...RouterLinkMock },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const RouterLinkElement = canvas.getByTestId("RouterLink");
        await step("Render the RouterLink", async () => {
            expect(RouterLinkElement).toBeDefined();
        });

        const RouterLinkClass = RouterLinkElement.getAttribute("class");
        await step("Verify the RouterLink class", async () => {
            expect(RouterLinkClass).toContain(RouterLinkMock.class);
        });

        const RouterLinkTo = RouterLinkElement.getAttribute("href");
        await step("Verify the RouterLink to", async () => {
            expect(RouterLinkTo).toContain(RouterLinkMock.to);
        });
    },
};
