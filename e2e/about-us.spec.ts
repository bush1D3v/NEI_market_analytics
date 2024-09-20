import {test, expect} from "@playwright/test";

test.describe("About Us Page Tests", () => {
	test("Visits the about-us page and checks content", async ({page}) => {
		await page.goto("/about-us");

		const mainContent = page.locator("main.container");
		await expect(mainContent).toBeVisible();

		const h1 = mainContent.locator("h1");

		const h2 = mainContent.locator("h2");

		const p = mainContent.locator("p");

		const header = page.locator("header");
		await expect(header).toBeVisible();

		const footer = page.locator("footer");
		await expect(footer).toBeVisible();
	});

	test("Checks visibility of Accordion and Badges components", async ({page}) => {
		await page.goto("/about-us");

		const accordion = page.locator("[data-testid='Accordion']");
		await expect(accordion).toBeVisible();

		const badges = page.locator("[data-testid='Badges']");
		await expect(badges).toBeVisible();
	});

	// test("Checks navigation back to home", async ({ page }) => {
	//     await page.goto("/about-us");

	//     const homeLink = page.locator("a[href='/']");
	//     await expect(homeLink).toBeVisible();
	//     await homeLink.click();

	//     await expect(page).toHaveURL("/");
	// });
});
