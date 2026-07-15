import path from 'path';
import { expect, Locator, Page } from '@playwright/test';
import { ExcelUtils } from '../dependencies/excel';

export interface AutomationFormData {
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  Gender: 'Male' | 'Female';
  Weekday: 'Sunday' | 'Monday' | 'Tuesday' | 'Thursday' | 'Friday' | 'Saturday';
  Country: string;
  Color: string;
  SortedList: string;
}

export class AutomationPracticePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly femaleRadio: Locator;
  readonly tuesdayCheckbox: Locator;
  readonly countrySelect: Locator;
  readonly colorsSelect: Locator;
  readonly sortedListSelect: Locator;
  readonly datePickerInput: Locator;
  readonly datePickerLink: Locator;
  readonly uploadInput: Locator;
  readonly seleniumCell: Locator;
  readonly seleniumCheckbox: Locator;
  readonly textAreaInput: Locator;
  readonly submitButton: Locator;
  readonly homeLink: Locator;
  readonly excelUtils: ExcelUtils;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Enter Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Enter EMail' });
    this.phoneInput = page.getByRole('textbox', { name: 'Enter Phone' });
    this.addressInput = page.getByRole('textbox', { name: 'Address:' });
    this.femaleRadio = page.getByRole('radio', { name: 'Female' });
    this.tuesdayCheckbox = page.getByRole('checkbox', { name: 'Tuesday' });
    this.countrySelect = page.getByLabel('Country:');
    this.colorsSelect = page.getByLabel('Colors:');
    this.sortedListSelect = page.getByLabel('Sorted List:');
    this.datePickerInput = page.locator('#datepicker');
    this.datePickerLink = page.getByRole('link', { name: '14' });
    this.uploadInput = page.locator('#singleFileInput');
    this.seleniumCell = page.getByRole('cell', { name: 'Learn Selenium' });
    this.seleniumCheckbox = page.locator('td:nth-child(4) > input').first();
    this.textAreaInput = page.locator('#input1');
    this.submitButton = page.locator('#section1').getByRole('button', { name: 'Submit' });
    this.homeLink = page.locator('#PageList1').getByRole('link', { name: 'Home' });
    this.excelUtils = new ExcelUtils('test-Data/Data.xlsx');
  }

  getTestDataFromExcel(sheetName: string, tcId: string): AutomationFormData {
    const sheetData = this.excelUtils.getSheetData(sheetName);
    const row = this.excelUtils.findRowByTCID(sheetData, tcId);

    if (!row) {
      throw new Error(`Test case '${tcId}' not found in sheet '${sheetName}'`);
    }

    return {
      Name: row.Name || '',
      Email: row.Email || '',
      Phone: row.Phone || '',
      Address: row.Address || '',
      Gender: (row.Gender as 'Male' | 'Female') || 'Male',
      Weekday: (row.Weekday as AutomationFormData['Weekday']) || 'Tuesday',
      Country: row.Country || '',
      Color: row.Color || '',
      SortedList: row.SortedList || '',
    };
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testautomationpractice.blogspot.com/');
  }

  async enterName(name: string): Promise<void> {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(name);
  }

  async enterEmail(email: string): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
  }

  async enterPhone(phone: string): Promise<void> {
    await expect(this.phoneInput).toBeVisible();
    await this.phoneInput.fill(phone);
  }

  async enterAddress(address: string): Promise<void> {
    await expect(this.addressInput).toBeVisible();
    await this.addressInput.fill(address);
  }

  async selectGender(gender: 'Male' | 'Female'): Promise<void> {
    const radio = this.page.getByRole('radio', { name: gender });
    await expect(radio).toBeVisible();
    await radio.check();
  }

  async selectWeekday(day: 'Sunday' | 'Monday' | 'Tuesday' | 'Thursday' | 'Friday' | 'Saturday'): Promise<void> {
    const checkbox = this.page.getByRole('checkbox', { name: day });
    await expect(checkbox).toBeVisible();
    await checkbox.check();
  }

  async selectCountry(country: string): Promise<void> {
    await expect(this.countrySelect).toBeVisible();
    await this.countrySelect.selectOption(country);
  }

  async selectColor(color: string): Promise<void> {
    await expect(this.colorsSelect).toBeVisible();
    await this.colorsSelect.selectOption(color);
  }

  async selectSortedList(value: string): Promise<void> {
    await expect(this.sortedListSelect).toBeVisible();
    await this.sortedListSelect.selectOption(value);
  }

  async fillRegistrationForm(testData: AutomationFormData): Promise<void> {
    await this.enterName(testData.Name);
    await this.enterEmail(testData.Email);
    await this.enterPhone(testData.Phone);
    await this.enterAddress(testData.Address);
    await this.selectGender(testData.Gender);
    await this.selectWeekday(testData.Weekday);
    await this.selectCountry(testData.Country);
    await this.selectColor(testData.Color);
    await this.selectSortedList(testData.SortedList);
  }

  async selectDate(): Promise<void> {
    await expect(this.datePickerInput).toBeVisible();
    await this.datePickerInput.click();
    await this.datePickerLink.click();
    await expect(this.page.locator('#txtDate')).toBeVisible();
  }

  async uploadResume(fileName: string): Promise<void> {
    await expect(this.uploadInput).toBeVisible();
    const filePath = path.resolve(__dirname, '..', fileName);
    await this.uploadInput.setInputFiles(filePath);
    await expect(this.seleniumCell).toBeVisible();
  }

  async submitForm(): Promise<void> {
    await expect(this.seleniumCheckbox).toBeVisible();
    await this.seleniumCheckbox.check();

    await expect(this.textAreaInput).toBeVisible();
    await this.textAreaInput.fill('test');

    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }

  async goToHomePage(): Promise<void> {
    await expect(this.homeLink).toBeVisible();
    await this.homeLink.click();
  }
}
