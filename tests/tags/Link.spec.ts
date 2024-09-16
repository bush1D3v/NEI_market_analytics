import { test, expect, describe } from "vitest";
import Link from "@/tags/Link.vue";
import { LinkMock } from "../../mocks/components/tags/Link";
import { mount } from "@vue/test-utils";

describe("Link Component Tests", () => {
    const wrapper = mount(Link, {
        props: { ...LinkMock }, slots: {
            default: 'Texto do Link'
        }
    });
    const linkComponent = wrapper.findComponent(Link);

    test("Should be able to render the component correctly", async () => {
        expect(linkComponent).toBeDefined();
    });

    test("Should be able to snapshot the component correctly", async () => {
        expect(linkComponent.html()).toMatchSnapshot();
    });

    test("Should be able to render the component with the correct props", async () => {
        expect(linkComponent.props("href")).toBe(LinkMock.href);
        expect(linkComponent.props("target")).toBe(LinkMock.target);
        expect(linkComponent.props("class")).toBe(LinkMock.class);
    });

    test("Should be able to render the component with the correct rel", async () => {
        expect(linkComponent.attributes("rel")).toBe("no-referrer");
    });

    test("Should be able to render the component with the correct text", async () => {
        expect(linkComponent.text()).toBe("Texto do Link");
    });

    test("Should be able to hover the component", async () => {
        expect(linkComponent.trigger("mouseenter")).toBeDefined();
    });
});
