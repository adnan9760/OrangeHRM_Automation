import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/Login.js';
import users from '../testData/Users.json';
import { userInfo } from 'node:os';

test.describe("Login Functionality",()=>{
    let loginpage;

    test.beforeEach(async ({page})=>{
        loginpage = new LoginPage(page);
        await loginpage.GoToLoginPage();
    });

    test("Login with valid Credentials",async ({page})=>{
        const{username,password} = users.validUser;
        await loginpage.Login(username,password);
        await expect(page).toHaveURL(/dashboard\/index/);
        await expect(loginpage.isDashboardHeaderVisible()).toBeTruthy();
        await expect(loginpage.dashboardHeader).toBeVisible();

    })

    test("Login with Invalid Credentials",async ({page})=>{
        const {username,password} = users.invalidUser;
        await loginpage.Login(username,password);
        const errorText = await loginpage.getErrorMessage();

        await expect(errorText).toContain("Invalid credentials");
        await expect(loginpage.errorMessage).toBeVisible();
    })

    test("verify login with invalid password", async ({page})=>{
        const {username,password} = users.invalidUser2;

        await loginpage.Login(username,password);

        const errorText = await loginpage.getErrorMessage();

        await expect(errorText).toContain("Invalid credentials");
        await expect(loginpage.errorMessage).toBeVisible();
    })

    test("verify login with invalid username", async ({page})=>{
        const {username,password} = users.invalidUser3;
        await loginpage.Login(username,password);
        const errorText = await loginpage.getErrorMessage();
        await expect(errorText).toContain("Invalid credentials");
        await expect(loginpage.errorMessage).toBeVisible();
    })

    test("verify login with empty username", async ({page})=>{
        const {username,password} = users.invalidUser4;
        await loginpage.Login(username,password);
        const errorText = await loginpage.isRequiredMessageVisible();
        await expect(errorText).toContain("Required");
        await expect(loginpage.requiredMessage).toBeVisible();
    })

    test("verify login with empty password",async({page})=>{
         const {username,password} = users.invalidUser5;
        await loginpage.Login(username,password);
        const errorText = await loginpage.isRequiredMessageVisible();
        await expect(errorText).toContain("Required");
        await expect(loginpage.requiredMessage).toBeVisible();
    })
    test("verify login with empty username and password",async({page})=>{
          const {username,password} = users.invalidUser6;
        await loginpage.Login(username,password);
        const errorText = await loginpage.isRequiredMessageVisible();
        await expect(errorText).toContain("Required");
        await expect(loginpage.requiredMessage.first()).toBeVisible();
    })
    test("verify logout functionality",async({page})=>{
        const {username,password} = users.validUser;
        await loginpage.Login(username,password);
         await expect(page).toHaveURL(/dashboard\/index/);
        await expect(loginpage.isDashboardHeaderVisible()).toBeTruthy();
        await expect(loginpage.dashboardHeader).toBeVisible();

        await loginpage.userprofile.click();
       const option = await page.locator("//ul[@role='menu']");
          const options = await option.locator("li a");

          const alloption = await options.all();

          console.log("Length of the options in the drop down is : ", await options.count());

       let status =false;
        let logoutlocator;
       for(const first of alloption){
       const optionText = await first.textContent();

        if(optionText === "Logout"){
            status = true;
            logoutlocator = first;
            break;
        }
       }

       await logoutlocator.click();
       await expect(page.locator('h5')).toContainText("Login");

     await expect(status).toBeTruthy();




    })
})