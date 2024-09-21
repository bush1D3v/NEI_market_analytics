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

	test("Should be able to render the component with the correct texts", async () => {
		expect(footerComponent.text()).toContain("© 2024 Todos os direitos reservados.");
		expect(footerComponent.text()).toContain("Info");
		expect(footerComponent.text()).toContain("Modo Escuro");
		expect(footerComponent.text()).toContain("Redes Sociais");
	});

	test("Should be able to render the component with the correct classes", async () => {
		expect(footerComponent.classes()).toStrictEqual([
			"layout",
			"container",
			"justify-center",
			"min-w-full",
			"border-t",
			"text-dark",
		]);
	});
});
