import { BasePage } from "../BasePage";

export class PersonalDetails extends BasePage{
    constructor(page){
        super(page);
        this.firstname = page.locator("//input[@placeholder='First Name']");
        this.middlename = page.locator("//input[@placeholder='Middle Name']");
        this.lastname = page.locator("//input[@placeholder='Last Name']");
        this.empid = page.locator("//input[@fdprocessedid='ilxxmb']");
        this.otherid = page.locator("(//input)[6]");
        this.dlnumber = page.locator("//body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[2]/div[2]/div[1]/div[1]/div[2]/input[1]");
        this.licenceExpdate = page.locator("(//input[@fdprocessedid='puydba'])[1]");
        
    }
}