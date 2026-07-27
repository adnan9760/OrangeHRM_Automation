import { test, expect } from "@playwright/test";
import { PIMPage } from "../pages/PimPage";
import { LoginPage } from "../pages/Login";
import users from '../testData/Users.json';
import { AddEmp } from "../pages/PIM Modules/AddEmp";

test.describe("verify PIM Module", () => {
  let addemp;
  let loginpage;

  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.GoToLoginPage();
      const{username,password} = users.validUser;
     await loginpage.Login(username,password);
    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(loginpage.isDashboardHeaderVisible()).toBeTruthy();
    await expect(loginpage.dashboardHeader).toBeVisible();


    addemp = new AddEmp(page);
    await loginpage.GoToLoginPage();

    await addemp.GotoAddEmppage();
  });
    test("Add employee with only mandatory fields", async () => {
    await addemp.addEmpwithoutcreatecredential("Rahul", "Kumar", "Sharma");
  });


   test("Add employee with login credentials", async () => {
    await addemp.addEmpwithcreatecredential(
      "Priya",
      "Kumari",
      "Verma",
      "priya.verma123",
      "Test@1234",
      "Test@1234"
    );
  });


  test("Error shown when mandatory fields are empty", async () => {
    await addEmp.savebtn.click();
    const msg = await addemp.isRequiredVisible();
    expect(msg).toContain("Required");
  });

   test("Error when password and confirm password do not match", async ({ page }) => {
    await addEmp.firstname.fill("Neha");
    await addEmp.middlename.fill("Kumari");
    await addEmp.lastname.fill("Gupta");
    await addEmp.createcredentionalbtn.click();
    await addEmp.username.fill("neha.gupta");
    await addEmp.password.fill("Pass@123");
    await addEmp.cnfpassword.fill("Pass@456"); // mismatch
    await addEmp.savebtn.click();

    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("Create login checkbox is unchecked by default", async () => {
    await addEmp.checkcheckbox();
  });

  
});