import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {
    
    test.beforeEach(async ({ page }) => { 
        
        await page.goto("https://practicesoftwaretesting.com/");
    
    })

    test("visual test", async ({ page }) => {
        await expect(page).toHaveScreenshot("home-page-no-auth.png");
        await page.waitForLoadState("networkidle");
    });

test("check sign in", async ({ page }) => {

    //Ensure the sign - in link is present
    await expect (page.getByTestId("nav-sign-in")).toHaveText("Sign in");

    });

    // //check the title of the page
    test("validate page title", async ({ page }) => {

    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

    })
    
     test("grid loads with 9 items", async ({ page }) => {

     // check the count of items displayed
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);

    })

     test("search for Thor Hammer", async ({ page }) => {

    //search for thor hammer and check the result
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
    
    });

});

test.describe("Home page customer 01 auth", () => {

    test.use({ storageState: ".auth/customer01/json"});
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");

    });

    test("visual test authorized", async ({ page }) => {
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot("home-page-auth.png");
        mask: [page.getByTitle("Practice Software Testing - Toolshop")]
    });

    test("check customer 01 is signed in", async ({ page }) => {

        await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
        await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    });
});