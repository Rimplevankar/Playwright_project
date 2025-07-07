import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import { log } from 'console';


test('login without Page Object test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="email"]').press('Tab');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await page.locator('[data-test="page-title"]').click();
});

test("Login with Page Object", async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.goto();
 // await loginpage.emailInput.fill("customer@practicesoftwaretesting.com");
 // await loginpage.passwordInput.fill("welcome01");
//  await loginpage.loginButton.click();
  await loginpage.login("customer@practicesoftwaretesting.com", "welcome01");
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
});

