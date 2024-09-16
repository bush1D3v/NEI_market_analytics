import {test, expect, describe} from "vitest";
import Header from "@/components/Layout/Header.vue";
import {mount} from "@vue/test-utils";

describe("Header Component Tests", () => {
	const wrapper = mount(Header);
	const headerComponent = wrapper.findComponent(Header);

	test("Should be able to render the component correctly", async () => {
		expect(headerComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(headerComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct text", async () => {
		expect(headerComponent.text()).toStrictEqual("Header");
	});

	test("Should be able to render the component with the correct classes", async () => {
		expect(headerComponent.classes()).toStrictEqual([
			"layout",
			"container",
			"justify-center",
			"min-w-full",
			"border-b",
		]);
	});
});
