import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AddEmp extends BasePage{

    constructor(page){
        super(page);
        this.firstname = page.locator("(//input[@placeholder='First Name'])[1]");
        this.middlename =  page.locator("//input[@placeholder='Middle Name']");
        this.lastname = page.locator("//input[@placeholder='Last Name']");
        this.empid = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
      this.createcredentionalbtn = page.locator(
  '.oxd-switch-wrapper input[type="checkbox"]'
);
        this.savebtn = page.locator("(//button[normalize-space()='Save'])[1]");
        this.cancelbtn = page.locator("(//button[normalize-space()='Cancel'])[1]");
        this.photouploadbtn = page.locator("//i[@class='oxd-icon bi-plus']");
        this.username = page.locator("(//input[@autocomplete='off'])[1]");
       this.enabledbtn = page.locator("(//input[@value='1'])[1]");
       this.disablebtn = page.locator("(//input[@value='2'])[1]");
       this.password = page.locator("//div[@class='oxd-grid-item oxd-grid-item--gutters user-password-cell']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']");
       this.cnfpassword = page.locator("(//input[@type='password'])[2]");
       this.requiredmsg = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)");


    }

    async GotoAddEmppage(){
        await this.GoToUrl("/web/index.php/pim/addEmployee");
    }

    async isRequiredVisible(){
      await this.requiredmsg.first().waitFor({state:'visible'});
    return await this.requiredmsg.first().textContent();
    }


    async empalreadyexist(){
        const val = await this.empid.inputValue();

        let  status = false;
        if(val !== " "){
            status = true;
        }
    await expect(this.requiredmsg).not.toHaveText("Employee Id already exists");
       await  expect(status).toBeTruthy();   
    }

    async checkcheckbox(){
        await expect(this.createcredentionalbtn).toBeDisabled();
    };

    async addEmpwithoutcreatecredential(firstname ,middlename , lastname){
     await this.firstname.fill(firstname);
     await this.middlename.fill(middlename);
     await this.lastname.fill(lastname);
     await  this.savebtn.click();
      await expect(this.page).toHaveURL(/viewPersonalDetails/);
    }


   async addEmpwithcreatecredential(firstname, middlename, lastname, username, password, cnfpassword){
    await this.firstname.fill(firstname);
    await this.middlename.fill(middlename);
    await this.lastname.fill(lastname);
    console.log(await this.createcredentionalbtn.isVisible());
    console.log(await this.createcredentionalbtn.evaluate(el => el.tagName));
console.log(await this.createcredentionalbtn.evaluate(el => el.type));
console.log(await this.createcredentionalbtn.isChecked());

    await this.createcredentionalbtn.check({ force:true});

    await this.username.fill(username);
    await this.password.fill(password);
    await this.cnfpassword.fill(cnfpassword);

  
    const pass = await this.password.inputValue();
    const cnfPass = await this.cnfpassword.inputValue();
    expect(pass).toBe(cnfPass);

    await this.savebtn.click();
    await expect(this.page).toHaveURL(/viewPersonalDetails/);
}
}