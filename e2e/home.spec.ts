import {test, expect} from "@playwright/test";

test.describe("Home Page Tests", () => {
	test("Visits the app root url and checks main content", async ({page}) => {
		await page.goto("/");

		const mainContainer = page.locator("main.container");
		await expect(mainContainer).toBeVisible();
		await expect(mainContainer).toHaveText("NEI Market Analytics");
	});

	test("Checks visibility of header", async ({page}) => {
		await page.goto("/");

		const header = page.locator("header");
		await expect(header).toBeVisible();
	});

	test("Checks visibility of footer", async ({page}) => {
		await page.goto("/");

		const footer = page.locator("footer");
		await expect(footer).toBeVisible();
	});

	test("Checks clickable text and navigation to about-us", async ({page}) => {
		await page.goto("/");

		const clickableText = page.locator("main.container >> text=NEI Market Analytics");
		await expect(clickableText).toBeVisible();
		await clickableText.click();

		await expect(page).toHaveURL("/about-us");
	});
});
