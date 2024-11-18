import {test, expect, describe} from "vitest";
import Image from "@/tags/Image.vue";
import {ImageMock} from "../../mocks/components/tags/Image";
import {shallowMount} from "@vue/test-utils";

describe("Image Component Tests", () => {
	const wrapper = shallowMount(Image, {props: {...ImageMock}});
	const imageComponent = wrapper.findComponent(Image);

	test("Should be able to render the component correctly", async () => {
		expect(imageComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(imageComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct props", async () => {
		expect(imageComponent.props("src")).toBe(ImageMock.src);
		expect(imageComponent.props("alt")).toBe(ImageMock.alt);
		expect(imageComponent.props("width")).toBe(ImageMock.width);
		expect(imageComponent.props("height")).toBe(ImageMock.height);
		expect(imageComponent.props("class")).toBe(ImageMock.class);
	});
});
