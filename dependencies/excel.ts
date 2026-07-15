import * as XLSX from 'xlsx';

export interface TestData {
  TC_ID: string;
  [key: string]: any;
}

export class ExcelUtils {
  private workbook: XLSX.WorkBook;

  constructor(filePath: string) {
    this.workbook = XLSX.readFile(filePath);
  }

  getSheetData(sheetName: string): TestData[] {
    const sheet = this.workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error(`Sheet '${sheetName}' not found`);
    }
  return XLSX.utils.sheet_to_json<TestData>(sheet);
  }

  findRowByTCID(
    sheetData: TestData[],
    tcId: string
  ): TestData | undefined {
    return sheetData.find((row) => row.TC_ID === tcId);
  }
}