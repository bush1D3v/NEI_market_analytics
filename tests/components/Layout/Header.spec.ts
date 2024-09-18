import {test, expect, describe} from "vitest";
import Header from "@/components/Layout/Header.vue";
import {shallowMount} from "@vue/test-utils";

describe("Header Component Tests", () => {
	const wrapper = shallowMount(Header);
	const headerComponent = wrapper.findComponent(Header);

	test("Should be able to render the component correctly", async () => {
		expect(headerComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(headerComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct classes", async () => {
		expect(headerComponent.classes()).toStrictEqual([
			"layout",
			"flex",
			"justify-between",
			"px-8",
			"items-center",
			"min-w-full",
			"border-b",
		]);
	});
});
