import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AddReports extends BasePage {

  constructor(page) {
    super(page);
    this.reportname = page.getByPlaceholder('Type here ...');
    this.requiredmsg = page.locator("span.oxd-input-field-error-message");

    this.selectioncritaria = page.locator(
 "//label[text()='Selection Criteria']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]"
).first();
    this.include = page.locator(
      "//label[text()='Include']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]"
    ).first();
    this.displaygroup = page.locator(
      "//label[text()='Select Display Field']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]"
    ).first()
     this.displayfieldgroup = page.locator("//label[text()='Select Display Field Group']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]").first()
    this.savebtn = page.getByRole('button', { name: 'Save' });
    this.canclebtn = page.getByRole('button', { name: 'Cancel' });

this.selectioncritariaplusbtn = page.locator(
  "//label[text()='Selection Criteria']/ancestor::div[contains(@class,'oxd-grid-item')]//button[contains(@class,'oxd-icon-button')]"
);  }

  async Gotopage() {
    await this.GoToUrl("/web/index.php/pim/definePredefinedReport");
  }

  async isRequiredVisible() {
    await this.requiredmsg.first().waitFor({ state: 'visible' });
    return await this.requiredmsg.first().textContent();
  }

  async handlePlusBtn(dropdownLocator, optionText){
    await dropdownLocator.click();

  }


  
getCriteriaRow(criteriaName) {
  return this.page.locator(
    `//p[contains(@class,'orangehrm-report-criteria-name') and text()='${criteriaName}']/ancestor::div[contains(@class,'orangehrm-report-criteria')]`
  );
}

getCriteriaLocator(criteriaName){
    return this.page.locator(
         `//p[contains(@class,'orangehrm-report-criteria-name') and text()='${criteriaName}']/ancestor::div[contains(@class,'orangehrm-full-width-grid')]`
    )
}

async deleteCriteria(criteriaName) {
  const row = this.getCriteriaRow(criteriaName);
  await row.locator('button.oxd-icon-button').click();
}


async addCriteriaWithValue(criteriaOptionName, value,optionText, isDropdown = false) {
  await this.selectioncritariaplusbtn.click();
  if (isDropdown) {
    await this.selectCriteriaDropdown(criteriaOptionName, value, optionText);
  } else {
    await this.fillCriteriaTextInput(criteriaOptionName, value);
  }
}

async fillCriteriaTextInput(criteriaName, value) {
  const row = this.getCriteriaLocator(criteriaName);

  
 await row.waitFor({state:"visible"})
  await row.locator('input[placeholder="Type for hints..."]').fill(value);

 
}


async selectCriteriaDropdown(criteriaName,value, optionText) {
  const row = this.getCriteriaLocator(criteriaName);
   await row.waitFor({state:"visible"})
  await row.locator('input[placeholder="Type for hints..."]').fill(value);

 const morerow = row.locator('ancestor:://div[contains@class,"oxd-autocomplete-text-input"] //div[contains@class,"oxd-autocomplete-wrapper"] ');

  const dropdown = morerow.locator('.oxd-select-text');
  const listbox = this.page.locator('[role="listbox"]');
  await listbox.waitFor({ state: 'visible' });
  await listbox.getByText(optionText, { exact: true }).click();
}
  async selectFromDropdown(dropdownLocator, optionText) {
    await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await dropdownLocator.click();
    await dropdownLocator.waitFor({ state: 'visible' });
    const listbox = this.page.locator('[role="listbox"]');
    await listbox.waitFor({ state: 'visible' });
    await listbox.getByText(optionText, { exact: true }).click();
  }

  async AddReportAllParameter(name, selectionCriteria, includeOption,selectdisplayfield, displayField) {
    await this.reportname.fill(name);

    await this.selectFromDropdown(this.selectioncritaria, selectionCriteria);

    await this.selectioncritariaplusbtn.click();

     await this.addCriteriaWithValue("Employee Name","John" ,"joker john selvam",true);

    
    await this.selectFromDropdown(this.include, includeOption);
    await this.selectFromDropdown(this.displayfieldgroup,selectdisplayfield);
    await this.selectFromDropdown(this.displaygroup, displayField);
    await this.savebtn.click();
  }
}