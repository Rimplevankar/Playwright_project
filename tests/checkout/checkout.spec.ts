import { test, expect } from "@playwright/test";

test.describe("Checkout workflow", async () => {
    test.use({ storageState: ".auth/customer01.json" });
    test.beforeEach(async ({ page }) => {
     await page.goto("https://practicesoftwaretesting.com")

    });

    test("buy now pay later", async ({ page }) => {
        await page.getByText("Claw Hammer With Shock Reduction Grip").click();
        await page.getByTestId("add-to-cart").click();
        await expect(page.getByTestId("cart=quantity")).toHaveText("1");
        await page.getByTestId("nav-cart").click();
        await page.getByTestId("proceed-1").click();
        await page.getByTestId("proceed-2").click();
       //validation biiling address page
        await expect(
            page.locator("/step-indicator").filter({ hasText: "2"})
        ).toHaveCSS("background-color", "rgb(51, 153, 51)");
        //filling billing address
        await page.getByTestId("address").fill("123 Testing Drive");
        await page.getByTestId("city").fill("Toronto");
        await page.getByTestId("state").fill("Ontario");
        await page.getByTestId("country").fill("Canada");
        await page.getByTestId("postcode").fill("123456");

        await page.getByTestId("proceed-2").click();
        await expect(page.getByTestId("finish")).toBeDisabled(); //Validate confirm button disabled
        await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
        await page
            .getByTestId("monthly_installments")
            .selectOption("6 Monthly Installments");
        await page.getByTestId("finish").click();
        await expect(page.locator(".help-block")).toHaveText("Payment was successful");

       headless
        ? await test.step("visual test", async () => {
            await expect(page).toHaveScreenshot("checkout.png", {
                mask: [page.getByTitle("Practice Software Testing - Toolshop")]
            });
        })
        : console.log("Running in Headed mode, no screenshot comparison");
    });

});