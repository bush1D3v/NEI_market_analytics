import {test, expect, describe} from "vitest";
import Badges from "@/components/Badges.vue";
import {mount} from "@vue/test-utils";
import {BadgesDto} from "@/components/Dto/BadgesDto";

describe("Badges Component Tests", () => {
	const wrapper = mount(Badges);
	const badgesComponent = wrapper.findComponent(Badges);

	test("Should be able to render the component correctly", async () => {
		expect(badgesComponent).toBeDefined();
	});

	test("Should be able to snapshot the component correctly", async () => {
		expect(badgesComponent.html()).toMatchSnapshot();
	});

	test("Should be able to render the component with the correct text", async () => {
		for (const item of BadgesDto) {
			expect(badgesComponent.text()).toContain(item.name);
			expect(badgesComponent.text()).toContain(item.nickname);
			expect(badgesComponent.text()).toContain(item.occupation);
		}
	});

	test("Should be able to render the component with the correct classes", async () => {
		expect(badgesComponent.classes()).toStrictEqual([
			"flex",
			"gap-4",
			"flex-wrap",
			"justify-center",
		]);
	});
});
