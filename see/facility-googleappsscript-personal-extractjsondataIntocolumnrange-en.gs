function extractJsonDataIntoColumnRange() {

    const jsonFileID = "xyz123xyz123xyz123xyz123xyz123xyz"; // as an example...
    
    // Steps to Locate the jsonFileID
    //     - Go to your Google Drive
    //     - Find the file you want to use
    //         - Right click it
    //             - Open with
    //                 - Open in a new tab
    //     - Look at the URL in your browser's address bar
    //         - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    //             - The FILE_ID is the part between /d/ and /view

    const jsonFileTargetedArray_eachObject_propertyAsReference = "key";
    const jsonFileTargetedArray_eachObject_propertyToGetContent = "text";

    //
    //
    //
    //

    const googleSheetsTab = "Hey, I'm the tab name!";

    // COLUMNS

    // Letters:   |   A |   B |   C |   D |   E |   F |   G |   H |   I |   J |   K |   L |   M |   N |   O |   P |   Q |   R |   S |   T |   U |   V |   W |   X |   Y |   Z |  
    // Integers:  |   1 |   2 |   3 |   4 |   5 |   6 |   7 |   8 |   9 |  10 |  11 |  12 |  13 |  14 |  15 |  16 |  17 |  18 |  19 |  20 |  21 |  22 |  23 |  24 |  25 |  26 |

    const columnToFindPropertyValues = 3;
    const columnToPastDesiredOutput = 14;
  
    // ROWS

    const firstRowIncluded = 42;
    const lastRowIncluded = 300;

    //
    //
    //
    //

    const jsonData = (function() {
        try {
            const fileContent = DriveApp.getFileById(jsonFileID).getBlob().getDataAsString();
            return JSON.parse(fileContent)
        } catch (error) {
            Logger.log('Error reading JSON data: ' + error);
            return []
        }
    })();


    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
        Logger.log("The sheet does not exist or the name is incorrect.");
        return
    }


    const range = sheet.getRange(firstRowIncluded, columnToFindPropertyValues, lastRowIncluded - firstRowIncluded + 1);
    const values = range.getValues();
    Logger.log("Input values: " + JSON.stringify(values));


    const outputValues = values.map(row => {
        const searchValue = row[0];
        Logger.log("Searching for: " + searchValue);


        const foundItems = jsonData["@"].form.flatMap(formItem => 
            formItem.form.filter(innerItem => innerItem[jsonFileTargetedArray_eachObject_propertyAsReference] === searchValue)
        );
        Logger.log("Found items: " + JSON.stringify(foundItems));


        const description = foundItems.length > 0 ? foundItems[0][jsonFileTargetedArray_eachObject_propertyToGetContent] : '';
        Logger.log("Description: " + description);


        return [description]
    });


    sheet.getRange(firstRowIncluded, columnToPastDesiredOutput, outputValues.length, 1).setValues(outputValues)
}
