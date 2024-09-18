import {test, expect, describe} from "vitest";
import Footer from "@/components/Layout/Footer.vue";
import {shallowMount} from "@vue/test-utils";

describe("Footer Component Tests", () => {
	const wrapper = shallowMount(Footer);
	const footerComponent = wrapper.findComponent(Footer);

	test("Should be able to render the component correctly", async () => {
		expect(footerComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(footerComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct text", async () => {
		expect(footerComponent.text()).toStrictEqual("Footer");
	});

	test("Should be able to render the component with the correct classes", async () => {
		expect(footerComponent.classes()).toStrictEqual([
			"layout",
			"container",
			"justify-center",
			"min-w-full",
			"border-t",
		]);
	});
});
