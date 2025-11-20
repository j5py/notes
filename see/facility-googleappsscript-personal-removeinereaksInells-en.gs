function removeLineBreaksInCells() {

    //
    //
    // TODO: Change `var` declarations to `const` or `let` where appropriate.
    //
    //

    var googleSheetsTab = "Hey, I'm the tab name!";

    //
    //

    var targetedRange = "B12:X42"; // You should consider changing this...

    //
    //
    //
    //

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(googleSheetsTab);
    if (!sheet) {
        Logger.log("The sheet does not exist or the name is incorrect.");
        return;
    }

    var values = sheet.getRange(targetedRange).getValues();
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
            if (typeof values[i][j] === "string") {
                values[i][j] = values[i][j].replace(/(\r\n|\n|\r)/g, "");
                values[i][j] = values[i][j].trim();
            }
        }
    }

    sheet.getRange(targetedRange).setValues(values);
}
