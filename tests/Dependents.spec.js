import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import { Dependents } from "../pages/PIM Modules/Dependents";
import users from '../testData/Users.json';
import { config } from "dotenv";



test.describe("Verify Dependents Page", () => {
  let loginpage, dependentsPage;

  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.GoToLoginPage();
    const { username, password } = users.validUser;
    await loginpage.Login(username, password);
    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(loginpage.dashboardHeader).toBeVisible();

    dependentsPage = new Dependents(page);
    await dependentsPage.GotoPage(239);
  });



  test("Add dependent with all fields filled", async ({ page }) => {
    await dependentsPage.addDependent(
      "ADNAN", "Child", "2026-01-01",
    );
    await expect(page.locator('.oxd-toast')).toBeVisible();
  });

  test("Add dependent with Name, Relationship, and Date of Birth", async ({ page }) => {
 
    await dependentsPage.addDependent(
      "SARA", "Child", "2026-01-01"
    );
    await expect(page.locator('.oxd-toast')).toBeVisible();
  });

  test("Add multiple dependents sequentially", async ({ page }) => {
    await dependentsPage.addDependent("ADNAN", "Child", "2026-01-01");
    await expect(page.locator('.oxd-toast')).toBeVisible();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); 
    await dependentsPage.addDependent("SARA", "Child", "2026-01-01");
    await expect(page.locator('.oxd-toast')).toBeVisible();
    await expect(page.getByText("ADNAN").first()).toBeVisible();
    await expect(page.getByText("SARA").first()).toBeVisible();
  });


  test("Should show validation error when Name is empty", async ({ page }) => {
    await dependentsPage.assigndependentbtn.click();
    await dependentsPage.selectFromDropdown(dependentsPage.getbyDropdownLabel('Relationship'), 'Child');
    await page.getByRole('button', { name: 'Save' }).first().click();
    await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible();
  });

  test("Should show validation error when Relationship is empty", async ({ page }) => {
    await dependentsPage.assigndependentbtn.click();
    await dependentsPage.getInputBylabel('Name').fill('ADNAN');
    await page.getByRole('button', { name: 'Save' }).first().click();

    await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible();
  });

  test("Should show validation error when name is not provided", async ({ page }) => {
    await dependentsPage.assigndependentbtn.click();
    await dependentsPage.selectFromDropdown(dependentsPage.getbyDropdownLabel('Relationship'), 'Child');
    await page.getByRole('button', { name: 'Save' }).first().click();
    await page.waitForTimeout(2000);
  await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible()
  });


  test("Cancel button should discard entered data", async ({ page }) => {
    await dependentsPage.assigndependentbtn.click();
    await dependentsPage.getInputBylabel('Name').fill('TEMP NAME');
    await dependentsPage.selectFromDropdown(dependentsPage.getbyDropdownLabel('Relationship'), 'Child');
        await page.getByRole('button', { name: 'Cancel' }).click();
    
    await expect(page.getByText('TEMP NAME')).not.toBeVisible();
  });


 

//   test("Should trim leading/trailing whitespace in Name field", async ({ page }) => {
//     await dependentsPage.addDependent(
//       "   ADNAN   ", "Child", "2026-01-01"
//     );
//     await expect(page.locator('.oxd-toast')).toBeVisible();
//     await expect(page.getByText("ADNAN", { exact: true }).first()).toBeVisible();;
//   });

});