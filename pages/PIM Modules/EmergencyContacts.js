import { test, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EmergencyContacts extends BasePage {
  constructor(page) {
    super(page);
    this.assignemergencycontactbtn = page.locator(
      "//h6[text()='Assigned Emergency Contacts']/following::button[contains(@class,'oxd-button')][1]"
    );
  }

  getInputBylabel(labelText) {
    return this.page.locator(
      `//label[contains(text(),'${labelText}')]/ancestor::div[contains(@class,'oxd-input-group')]//input`
    );
  }

  async GotoPage(empNumber) {
    await this.GoToUrl(`/web/index.php/pim/viewEmergencyContacts/empNumber/${empNumber}`);
  }

  async addEmergencyContact(name, relationship, home, mobile, work) {

    await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.page.locator('.oxd-toast').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});

    await this.assignemergencycontactbtn.click();
    await this.page.getByText('Save Emergency Contact').waitFor({ state: 'visible' });

    await this.getInputBylabel('Name').fill(name);
    await this.getInputBylabel('Relationship').fill(relationship);
    await this.getInputBylabel('Home Telephone').fill(home);
    await this.getInputBylabel('Mobile').fill(mobile);
    await this.getInputBylabel('Work Telephone').fill(work);

    await this.page.getByRole('button', { name: 'Save' }).first().click();
  }
}