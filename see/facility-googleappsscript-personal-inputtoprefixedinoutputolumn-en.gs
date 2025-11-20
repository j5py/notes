function inputToPrefixedInOutputColumn() {

    const prefix = "Example: ";

    //
    //
    //
    //

    const googleSheetsTab = "Hey, I'm the tab name!";

    // COLUMNS

    // Letters:   |   A |   B |   C |   D |   E |   F |   G |   H |   I |   J |   K |   L |   M |   N |   O |   P |   Q |   R |   S |   T |   U |   V |   W |   X |   Y |   Z |  
    // Integers:  |   1 |   2 |   3 |   4 |   5 |   6 |   7 |   8 |   9 |  10 |  11 |  12 |  13 |  14 |  15 |  16 |  17 |  18 |  19 |  20 |  21 |  22 |  23 |  24 |  25 |  26 |  

    const inputColumn = 3;
    const outputColumn = 14;

    // ROWS

    const firstRowIncluded = 42;
    const lastRowIncluded = 300;

    //
    //
    //
    //

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(googleSheetsTab);
    if (!sheet) {
      Logger.log("The sheet does not exist or the name is incorrect.");
      return
    }

    const range = sheet.getRange(firstRowIncluded, inputColumn, lastRowIncluded - firstRowIncluded + 1);
    const values = range.getValues();

    const transformedValues = values.map(row => {
        const input = row[0];
        if (input) {
            return [prefix + String(input)]
        }
        
    });

    sheet.getRange(firstRowIncluded, outputColumn, transformedValues.length, 1).setValues(transformedValues)
}
