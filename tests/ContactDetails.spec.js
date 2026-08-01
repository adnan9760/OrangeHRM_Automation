import { test, expect } from "@playwright/test";
import path from 'path';   // ye bhi missing tha
import { LoginPage } from "../pages/Login";
import { ContactDetails } from "../pages/PIM Modules/ContactDetails";
import users from '../testData/Users.json';

test.describe("Verify Contact Details Page", () => {
  let loginpage, contactdetailspage;

  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.GoToLoginPage();
    const { username, password } = users.validUser;
    await loginpage.Login(username, password);
    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(loginpage.dashboardHeader).toBeVisible();
    contactdetailspage = new ContactDetails(page);
    await contactdetailspage.Gotopage();
  });

  test("Verify with all parameter", async ({ page }) => {
    await contactdetailspage.verifyContactDetail(
      "Ward No 02", "Kakrala", "Kakrala", "Uttar Pradesh", "243637", "India",
      "9760049313", "9760049313", "934830",
      "adnanofficial239@gmail.com", "ak9760049@gmail.com"
    );
  });   

  test("Upload attachment", async ({ page }) => {   
    const filePath = path.resolve(__dirname, 'C:\\Users\\ak976\\Downloads\\ADNAN__RESUME.pdf');
    await contactdetailspage.uploadAttachment(filePath, "My resume");
    await expect(page.locator('.oxd-toast')).toBeVisible();
  });
});