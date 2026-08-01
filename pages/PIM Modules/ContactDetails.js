import { test, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ContactDetails extends BasePage {

  constructor(page) {
    super(page);
    this.telephonelocator = page.locator(
      "//label[text()='Home']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-grid-item')]//div[contains(@class,'oxd-grid-3')]"
    );
    this.emaillocator = page.locator(
      "//label[text()='Work Email']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-grid-item')]//div[contains(@class,'oxd-grid-3')]"
    );

        this.requiredmsg = page.locator("span.oxd-input-field-error-message");
this.savebtn = page.locator("//button[normalize-space()='Save']");

  
    this.country = page.locator(
      "//label[text()='Country']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]"
    ).first();
 this.attachmentAddBtn = page.locator(
    "//h6[text()='Attachments']/following::button[contains(@class,'oxd-button')][1]"
  );  }



  getInputBylabel(labelText) {
    return this.page.locator(
      `//label[text()='${labelText}']/ancestor::div[contains(@class,'oxd-input-group')]//input`
    );
  }

  async Gotopage() {
    await this.GoToUrl('web/index.php/pim/contactDetails/empNumber/116');
  }

  async verifyContactDetail(street1, street2, city, state, zipcode, country, home, mobile, work, Work_Email, other_email) {
    await this.getInputBylabel('Street 1').fill(street1);
    await this.getInputBylabel('Street 2').fill(street2);

    await this.getInputBylabel('City').fill(city);
    await this.getInputBylabel('State/Province').fill(state);
    await this.getInputBylabel('Zip/Postal Code').fill(zipcode);

    await this.country.click();

    const listbox = this.page.locator('[role="listbox"]').first();
    await listbox.waitFor({ state: 'visible' });
    await listbox.getByText(country, { exact: true }).first().click();

    await this.getInputBylabel('Home').fill(home);
    await this.getInputBylabel('Mobile').fill(mobile);
    await this.getInputBylabel('Work').fill(work);
    await this.getInputBylabel('Work Email').fill(Work_Email);
    await this.getInputBylabel('Other Email').fill(other_email);

    await this.savebtn.click();
  }

  async IsRequiredMessageVisible(){
    await this.requiredmsg.first().waitFor({state:'visible'});
    return await this.requiredmsg.first().textContent();

  }

  async errorMessageVisible(){
    await this.requiredmsg.first().waitFor({state:'visible'});
    return await this.requiredmsg.first().textContent();
  }
   

 async uploadAttachment(filePath, description = '') {
  await this.attachmentAddBtn.click();

  await this.page.locator("input[type='file']").setInputFiles(filePath);

  if (description) {
    await this.page.getByPlaceholder('Type comment here').fill(description);
  }

  await this.page.getByRole('button', { name: 'save' }).first().click();
}

async withoutuploadAttachment(description = '') {
      await this.page.getByRole('button', { name: 'save' }).first().click();

      await this.page.getByText('Required').waitFor({ state: 'visible' });
}



}