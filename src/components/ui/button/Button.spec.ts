import {test, expect, describe, beforeEach} from "vitest";
import {render, screen} from "@testing-library/vue";
import Button from "./Button.vue";

const buttonTestId: string = "ButtonSCN";

describe("Shadcn-vue Button Component Tests", () => {
	beforeEach(() => {
		render(Button);
	});

	test("Should be able to render the component correctly", async () => {
		expect(screen.getByTestId(buttonTestId)).toBeDefined();
	});

	test("Should be able to render the component correctly with custom props", async () => {
		render(Button, {
			props: {
				default: "Button",
			},
		});
		expect(screen.getByText("Button")).toBeDefined();
	});
});
