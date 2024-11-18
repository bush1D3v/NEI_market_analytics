import {test, expect, describe} from "vitest";
import RouterLink from "@/tags/RouterLink.vue";
import {RouterLinkMock} from "../../mocks/components/tags/RouterLink";
import {shallowMount} from "@vue/test-utils";

describe("Link Component Tests", () => {
	const wrapper = shallowMount(RouterLink, {
		props: {...RouterLinkMock},
	});
	const routerLinkComponent = wrapper.findComponent(RouterLink);

	test("Should be able to render the component correctly", async () => {
		expect(routerLinkComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(routerLinkComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct props", async () => {
		expect(routerLinkComponent.props("to")).toBe(RouterLinkMock.to);
		expect(routerLinkComponent.props("class")).toContain(RouterLinkMock.class);
	});

	test("Should be able to hover the component", async () => {
		expect(routerLinkComponent.trigger("mouseenter")).toBeDefined();
	});
});
