import {test, expect, describe} from "vitest";
import Dropdown from "@/components/Dropdown.vue";
import {mount} from "@vue/test-utils";
import {DropdownMock} from "../../mocks/components/Dropdown";

describe("Dropdown Component Tests", () => {
	const wrapper = mount(Dropdown, {
		props: {buttonTile: "Tópicos", label: "Tópicos", menu: DropdownMock},
	});
	const DropdownComponent = wrapper.findComponent(Dropdown);

	test("Should be able to render the component correctly", async () => {
		expect(DropdownComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(DropdownComponent.html()).toMatchSnapshot();
	});

	test("Should be able to hover the component", async () => {
		expect(DropdownComponent.trigger("mouseenter")).toBeDefined();
	});

	test("Should be able to click the component", async () => {
		expect(DropdownComponent.trigger("click")).toBeDefined();
	});
});
