import {test,expect} from "@playwright/test"
import { AddReports } from "../pages/PIM Modules/AddReports"
import { LoginPage } from "../pages/Login"
import users from '../testData/Users.json';

test.describe("Verify Add Report Page",()=>{
    let loginpage;
    let addreport;

    test.beforeEach(async ({page})=>{
       loginpage = new LoginPage(page);
    await loginpage.GoToLoginPage();
    const{username,password} = users.validUser;
     await loginpage.Login(username,password);
    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(loginpage.isDashboardHeaderVisible()).toBeTruthy();
    await expect(loginpage.dashboardHeader).toBeVisible();

    addreport = new AddReports(page);
       await addreport.Gotopage();

    })


    test("Add Report with all parameter",async ()=>{
       await addreport.AddReportAllParameter("EmpReport","Employee Name","Past Employees Only","Personal","Employee Id");
    
    })

//     test("Add multiple criteria with values", async () => {
//   await addreport.reportname.fill("Multi Criteria Report");

//   // Employee Name criteria — text input hai
//   await addreport.selectioncritariaplusbtn.click();
//   await addreport.fillCriteriaTextInput("Employee Name", "John");

//   // Pay Grade criteria — dropdown hai
//   await addreport.selectioncritariaplusbtn.click();
//   await addreport.selectCriteriaDropdown("Pay Grade", "Grade 1");

//   await addreport.savebtn.click();
// });
})