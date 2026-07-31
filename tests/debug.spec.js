import { test } from "@playwright/test";

test("debug dropdown", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/pim/definePredefinedReport");

  const dropdown = page.locator(
    "//label[text()='Selection Criteria']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]"
  ).first();

  await dropdown.waitFor({ state: 'visible' });
  await dropdown.click();

  // Yeh naya part hai — listbox dhoondo aur options print karo
  const listbox = page.locator('[role="listbox"]');
  await listbox.waitFor({ state: 'visible' });

  const options = await listbox.locator('span').allTextContents();
  console.log("Available options:", options); // yeh terminal mein dikhega

   await listbox.getByText("Education", { exact: true }).click();

  await page.waitForTimeout(2000);
});