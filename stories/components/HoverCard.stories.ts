import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect } from "@storybook/test";
import HoverCard from "@/components/HoverCard.vue";
import { HoverCardMock } from "../../mocks/components/HoverCard";

const meta: Meta<typeof HoverCard> = {
    title: "Components/HoverCard",
    component: HoverCard,
    tags: [ "autodocs" ],
    parameters: {
        actions: {
            argTypesRegex: "^on.*",
        },
    },
    argTypes: {
        title: {
            description: "The title of the card",
            example: "John Doe",
            control: { type: "text" },
        },
        description: {
            description: "The description of the card",
            example: "Creator of Radix UI",
            control: { type: "text" },
        },
        startDate: {
            description: "The start date of the card",
            example: "February 2022",
            control: { type: "text" },
        },
        avatarSrc: {
            description: "The avatar source of the card",
            example: "https://avatars.githubusercontent.com/u/11473738?v=4",
            control: { type: "text" },
        },
        avatarFallback: {
            description: "The avatar fallback of the card",
            example: "JD",
            control: { type: "text" },
        },
    },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
    name: "Default",
    args: HoverCardMock,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const HoverCardButtonElement = canvas.getByTestId("HoverCardButton");
        await step("Render the HoverCardButton", async () => {
            expect(HoverCardButtonElement).toBeDefined();
        });

        const HoverCardButtonClass = HoverCardButtonElement.getAttribute("class");
        await step("Verify the HoverCardButton class", async () => {
            expect(HoverCardButtonClass).toBe(
                "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 p-0 justify-start w-fit",
            );
        });
    },
};
