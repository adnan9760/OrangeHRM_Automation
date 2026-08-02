import { test, expect } from "@playwright/test"
import { AddReports } from "../pages/PIM Modules/AddReports"
import { LoginPage } from "../pages/Login"
import users from '../testData/Users.json';

test.describe("Verify Add Report Page", () => {
    let loginpage;
    let addreport;

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page);
        await loginpage.GoToLoginPage();
        const { username, password } = users.validUser;
        await loginpage.Login(username, password);
        await expect(page).toHaveURL(/dashboard\/index/);
        await expect(loginpage.dashboardHeader).toBeVisible();

        addreport = new AddReports(page);
        await addreport.Gotopage();
    })

    test("Add Report with all parameter", async ({ page }) => {
       const reportName = `EmpReport_${Date.now()}`;
        await addreport.AddReportAllParameter(reportName, "Employee Name", "Past Employees Only", "Personal", "Employee Id");
         await page.waitForTimeout(3000);
        const toast_msg = await addreport.ToastMsg();
        await expect(toast_msg).toContain("Success");
      
    })

    test("Add Report without Required Paramenter", async ({ page }) => {
        await addreport.AddReportAllParameter("", "Employee Name", "Past Employees Only", "Personal", "Employee Id");
       
        const errorText = await addreport.isRequiredVisible();

        await expect(errorText).toContain("Required");
        await expect(addreport.requiredmsg).toBeVisible();
    })


    test("Verify The Report Save Successfully ",async({page })=>{
     await addreport.VerifyReport("Emp","Employee Job Details");
    })

    
})