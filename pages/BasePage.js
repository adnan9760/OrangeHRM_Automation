export class BasePage{

    constructor(page){
        this.page = page;
    }

    async GoToUrl(url='/'){
  await this.page.goto(url);
    }

    async waitForVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }
};
