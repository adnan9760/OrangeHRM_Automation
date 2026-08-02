import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import { EmergencyContacts } from "../pages/PIM Modules/EmergencyContacts";
import users from '../testData/Users.json';

test.describe("Verify Emergency Contacts Page", () => {
  let loginpage, emergencyContactsPage;

  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.GoToLoginPage();
    const { username, password } = users.validUser;
    await loginpage.Login(username, password);
    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(loginpage.dashboardHeader).toBeVisible();

    emergencyContactsPage = new EmergencyContacts(page);
    await emergencyContactsPage.GotoPage(116);
  });



  test("Add emergency contact with all fields filled", async ({ page }) => {
    await emergencyContactsPage.addEmergencyContact(
      "ADNAN", "BROTHER", "9760049313", "9760049313", "0141234567"
    );
    await expect(page.locator('.oxd-toast')).toBeVisible();
  });

  test("Add emergency contact with Name, Relationship, and at least one phone", async ({ page }) => {
 
    await emergencyContactsPage.addEmergencyContact(
      "SARA", "SISTER", "9760049999", "", ""
    );
    await expect(page.locator('.oxd-toast')).toBeVisible();
  });

  test("Add multiple emergency contacts sequentially", async ({ page }) => {
    await emergencyContactsPage.addEmergencyContact("ADNAN", "BROTHER", "9760049313", "", "");
    await expect(page.locator('.oxd-toast')).toBeVisible();
    await page.waitForLoadState('networkidle');

    await emergencyContactsPage.addEmergencyContact("SARA", "SISTER", "", "9760049999", "");
    await expect(page.locator('.oxd-toast')).toBeVisible();

    await expect(page.getByText("ADNAN").first()).toBeVisible();
    await expect(page.getByText("SARA").first()).toBeVisible();
  });


  test("Should show validation error when Name is empty", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Relationship').fill('BROTHER');
    await emergencyContactsPage.getInputBylabel('Home Telephone').fill('9760049313');
    await page.getByRole('button', { name: 'Save' }).first().click();

    await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible();
  });

  test("Should show validation error when Relationship is empty", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Name').fill('ADNAN');
    await emergencyContactsPage.getInputBylabel('Home Telephone').fill('9760049313');
    await page.getByRole('button', { name: 'Save' }).first().click();

    await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible();
  });

  test("Should show validation error when no phone number is provided", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Name').fill('ADNAN');
    await emergencyContactsPage.getInputBylabel('Relationship').fill('BROTHER');
    await page.getByRole('button', { name: 'Save' }).first().click();

    await expect(page.getByText("At least one phone number is required")).toBeVisible();
  });

  test("Should show validation error for non-numeric phone number", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Name').fill('ADNAN');
    await emergencyContactsPage.getInputBylabel('Relationship').fill('BROTHER');
    await emergencyContactsPage.getInputBylabel('Home Telephone').fill('abcdefgh');

    await page.getByRole('button', { name: 'Save' }).first().click();
    await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible();
  });

  test("Cancel button should discard entered data", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Name').fill('TEMP NAME');
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByText('TEMP NAME')).not.toBeVisible();
  });



  test("Should show error for name exceeding 100 characters", async ({ page }) => {
    const longName = "A".repeat(200);
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Name').fill(longName);
    await emergencyContactsPage.getInputBylabel('Relationship').fill('FRIEND');
    await emergencyContactsPage.getInputBylabel('Home Telephone').fill('9760049313'); // satisfy phone rule
    await page.getByRole('button', { name: 'Save' }).first().click();

    await expect(page.getByText("Should not exceed 100 characters")).toBeVisible();
  });

  test("Should reject special characters in phone number field", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await emergencyContactsPage.getInputBylabel('Name').fill('ADNAN');
    await emergencyContactsPage.getInputBylabel('Relationship').fill('BROTHER');
    await emergencyContactsPage.getInputBylabel('Mobile').fill('!@#$%^&*()');

    await page.getByRole('button', { name: 'Save' }).first().click();
    await expect(page.locator("span.oxd-input-field-error-message").first()).toBeVisible();
  });

  test("Should trim leading/trailing whitespace in Name field", async ({ page }) => {
    await emergencyContactsPage.addEmergencyContact(
      "   ADNAN   ", "BROTHER", "9760049313", "", ""
    );
    await expect(page.locator('.oxd-toast')).toBeVisible();
    await expect(page.getByText("ADNAN", { exact: true }).first()).toBeVisible();;
  });


  test("Add button should open the Save Emergency Contact form", async ({ page }) => {
    await emergencyContactsPage.assignemergencycontactbtn.click();
    await expect(page.getByText("Save Emergency Contact")).toBeVisible();
  });
});