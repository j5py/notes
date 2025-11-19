function multilineSearchAndReplaceCells() {

    //
    //
    //
    //

    var googleSheetsTab = "Hey, I'm the tab name!";

    //
    //

    var searchCellContent = `Help

Backticks make this string multiline, even if it's ugly on the left side and breaks the indentation, which is important if you want to match the targeted cell content."

Have a nice day!`;

    //
    //

    var replaceCellContent = `<h1>Help</h1><p>Backticks make this string multiline, even if it's ugly on the left side and breaks the indentation, which is important if you want to match the targeted cell content.</p><p>Have a nice day!</p>`;

    //
    //
    //
    //

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(googleSheetsTab);
    if (!sheet) {
      Logger.log("The sheet does not exist or the name is incorrect.");
      return;
    }

    var range = sheet.getDataRange();
    var values = range.getValues();
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < values[i].length; j++) {
        if (typeof values[i][j] === "string") {
          values[i][j] = values[i][j].replace(new RegExp(searchCellContent.replace(/\n/g, "\\n"), "g"), replaceCellContent);
        }
      }
    }

    range.setValues(values);
}
