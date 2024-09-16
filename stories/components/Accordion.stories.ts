import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect } from "@storybook/test";
import Accordion from "@/components/Accordion.vue";
import { AccordionDto } from "@/components/Dto/AccordionDto";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    tags: [ "autodocs" ],
    parameters: {
        actions: {
            argTypesRegex: "^on.*",
        },
    },
    argTypes: {
        items: {
            description: "The items of the Accordion",
            example: AccordionDto,
            control: { type: "object" },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    name: "Default",
    args: {
        items: AccordionDto,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const AccordionElement = canvas.getByTestId("Accordion");
        await step("Render the Accordion", async () => {
            expect(AccordionElement).toBeDefined();
        });

        const AccordionClass = AccordionElement.getAttribute("class");
        await step("Verify the Accordion class", async () => {
            expect(AccordionClass).toBe("w-full");
        });
    },
};
