import { test, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class Dependents extends BasePage {
  constructor(page) {
    super(page);
    this.assigndependentbtn = page.locator(
      "//h6[text()='Assigned Dependents']/following::button[contains(@class,'oxd-button')][1]"
    );
     this.relationshipdropdown = page.locator(
    "//label[text()='Relationship']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]"
  );
  }

  getInputBylabel(labelText) {
    return this.page.locator(
      `//label[contains(text(),'${labelText}')]/ancestor::div[contains(@class,'oxd-input-group')]//input`
    );
  }

  getbyDropdownLabel(labelText) {
    return this.page.locator(
        `//label[contains(text(),'${labelText}')]/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]//div[contains(@class,'oxd-select-text-input')]`
    )
  }

 
  async GotoPage(empNumber) {
    await this.GoToUrl(`/web/index.php/pim/viewDependents/empNumber/${empNumber}`);
  }

   async selectFromDropdown(dropdownLocator, optionText) {
    await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await dropdownLocator.click();
    await dropdownLocator.waitFor({ state: 'visible' });
    const listbox = this.page.locator('[role="listbox"]');
    await listbox.waitFor({ state: 'visible' });
    await listbox.getByText(optionText, { exact: true }).click();
  }

  async addDependent(name, relationship, dob) {

    

    await this.assigndependentbtn.click();
    await this.page.getByText('Add Dependent').waitFor({ state: 'visible' });

    await this.getInputBylabel('Name').fill(name);
    await this.selectFromDropdown(this.getbyDropdownLabel('Relationship'), relationship);
    if(relationship === "Other"){
        await this.getInputBylabel('Please Specify').fill(relationship);
    }

    await this.getInputBylabel('Date of Birth').fill(dob);

    await this.page.getByRole('button', { name: 'Save' }).first().click();
  }
}