import { findSourceMap } from "node:module";
import { BasePage } from "./BasePage";

export class PIMPage extends BasePage{
    constructor(page){
           super(page);
           this.PIMMenu = page.locator("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='PIM']");
           this.addEmpbtn = page.locator("//button[normalize-space()='Add']");
           this.firstName = page.locator("//input[@placeholder='First Name']");
           this.middlename = page.locator("//input[@placeholder='Middle Name']");
           this.lastname = page.locator("//input[@placeholder='Last Name']");
           this.empid = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
           this.createloginbtn = page.locator("//input[@type='checkbox']");
           this.empPhotoInput = page.locator("//button[@class='oxd-icon-button oxd-icon-button--solid-main employee-image-action']");
           this.savebtn = page.locator("button[type='submit']");
           this.cancelbtn = page.locator("//button[normalize-space()='Cancel']")
           this.loginldetails = page.locator("//span[@class='oxd-switch-input oxd-switch-input--active --label-right']");
           this.username = page.locator("(//input[@class='oxd-input oxd-input--active'])[3]");
           this.status = page.locator("//input[@value='1']");
           this.password = page.locator('(//input[@fdprocessedid="mydfyk"])[1]');
           this.cnfpassword = page.locator("//input[@fdprocessedid='vvtmeo']");
           this.employeeRecords = page.locator("//div[@class='oxd-table-body']");        
           this.toastbtn = page.locator("//div[@class='oxd-toast oxd-toast--success oxd-toast-container--toast']");   
    }

    async goto(){
        await this.PIMMenu.click();
        await this.page.waitForURL(/pim\/viewEmployeeList/);
    }

    async addEmployee(firstname,middlename,lastname){
        this.firstName= firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.savebtn.click();
    }
}