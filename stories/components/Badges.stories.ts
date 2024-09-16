import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect } from "@storybook/test";
import Badges from "@/components/Badges.vue";
import { BadgesDto } from "@/components/Dto/BadgesDto";

const meta: Meta<typeof Badges> = {
    title: "Components/Badges",
    component: Badges,
    tags: [ "autodocs" ],
    parameters: {
        actions: {
            argTypesRegex: "^on.*",
        },
    },
    argTypes: {
        badges: {
            description: "The badges of the Badges",
            example: BadgesDto,
            control: { type: "object" },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badges>;

export const Default: Story = {
    name: "Default",
    args: {
        badges: BadgesDto,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const BadgesElement = canvas.getByTestId("Badges");
        await step("Render the Badges", async () => {
            expect(BadgesElement).toBeDefined();
        });

        const BadgesClass = BadgesElement.getAttribute("class");
        await step("Verify the Badges class", async () => {
            expect(BadgesClass).toBe("flex gap-4 flex-wrap justify-center");
        });
    },
};
