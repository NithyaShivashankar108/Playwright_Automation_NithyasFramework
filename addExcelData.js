const XLSX = require('xlsx');
const path = require('path');

// Read existing workbook or create new one
const filePath = path.join(__dirname, 'test-Data', 'Data.xlsx');
let workbook;
try {
  workbook = XLSX.readFile(filePath);
} catch (e) {
  workbook = XLSX.utils.book_new();
}

// Define test data for AutomationPractice sheet
const automationPracticeData = [
  {
    TC_ID: 'TC001',
    Name: 'Nithya',
    Email: 'test@gmail.com',
    Phone: '9876543210',
    Address: '123,street,chennai',
    Gender: 'Female',
    Weekday: 'Tuesday',
    Country: 'india',
    Color: 'blue',
    SortedList: 'cat'
  },
  {
    TC_ID: 'TC002',
    Name: 'John Doe',
    Email: 'john@example.com',
    Phone: '1234567890',
    Address: '456,avenue,newdelhi',
    Gender: 'Male',
    Weekday: 'Monday',
    Country: 'india',
    Color: 'red',
    SortedList: 'dog'
  }
];

// Create worksheet from data
const worksheet = XLSX.utils.json_to_sheet(automationPracticeData);

// Add or update the sheet
if (workbook.SheetNames.includes('AutomationPractice')) {
  workbook.Sheets['AutomationPractice'] = worksheet;
} else {
  XLSX.utils.book_append_sheet(workbook, worksheet, 'AutomationPractice');
}

// Write the workbook
XLSX.writeFile(workbook, filePath);
console.log('AutomationPractice sheet added to Data.xlsx successfully!');
