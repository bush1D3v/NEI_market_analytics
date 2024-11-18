import {test, expect, describe} from "vitest";
import Accordion from "@/components/Accordion.vue";
import {mount} from "@vue/test-utils";
import {AccordionMock} from "../../mocks/components/Accordion";

describe("Accordion Component Tests", () => {
	const wrapper = mount(Accordion, {props: {items: AccordionMock}});
	const accordionComponent = wrapper.findComponent(Accordion);

	test("Should be able to render the component correctly", async () => {
		expect(accordionComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(accordionComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct text", async () => {
		for (const item of AccordionMock) {
			expect(accordionComponent.text()).toContain(item.title);
		}
	});

	test("Should be able to render the component with the correct classes", async () => {
		expect(accordionComponent.classes()).toStrictEqual(["w-full"]);
	});

	test("Should have the correct collapsible prop", async () => {
		expect(accordionComponent.props("collapsible")).toBe(true);
	});

	test("Should have the correct type prop", async () => {
		expect(accordionComponent.props("type")).toBe("single");
	});
});
