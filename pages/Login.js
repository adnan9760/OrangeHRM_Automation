import {BasePage} from "./BasePage";
export class LoginPage extends BasePage{

    constructor(page){
        super(page);
        this.usernameInput = page.locator('//input[@placeholder="Username"]');
        this.passWordInput = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("button[type='submit']");
        this.errorMessage = page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text");
       this.dashboardHeader = page.locator('h6', { hasText: 'Dashboard' });
       this.requiredMessage = page.locator("//span[@class='oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message']");
       this.userprofile = page.locator("//p[@class='oxd-userdropdown-name']");
    }

    async GoToLoginPage(){
        await this.GoToUrl("/web/index.php/auth/login");
    }

    async Login(username, password){
        await this.usernameInput.fill(username);
        await this.passWordInput.fill(password);
        await this.loginButton.click();
    }
    async getErrorMessage(){
        await this.errorMessage.waitFor({state:'visible'});
        return await this.errorMessage.textContent();
    }

    async isDashboardHeaderVisible(){
        await this.dashboardHeader.waitFor({state:'visible'});
        return await this.dashboardHeader.isVisible();
    }


    async isRequiredMessageVisible(){
        await this.requiredMessage.first().waitFor({state:'visible'});
        return await this.requiredMessage.first().textContent();
    }

}