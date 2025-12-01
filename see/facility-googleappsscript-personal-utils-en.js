function abc() {
    // Your code here...

    const xy = {
        getSheet: (tab) => {
            return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
        },
        getRangeY: (sheet, rowNumFirstIn, rowNumLastIn) => {
            return sheet.getRange(rowNumFirstIn, 1, rowNumLastIn - rowNumFirstIn + 1, sheet.getLastColumn());
        },
        getRangeXY: (sheet, rowNumFirstIn, rowNumLastIn, colNumFirstIn, colNumLastIn) => {
            // Column number based, not column index.
            return sheet.getRange(rowNumFirstIn, colNumFirstIn, rowNumLastIn - rowNumFirstIn + 1, colNumLastIn - colNumFirstIn + 1);
        },
        getRows: (range) => {
            return range.getValues();
        },
        getCell: (sheet, rowNum, colNum) => {
            return sheet.getRange(rowNum, colNum).getValue();
        },
        getCache: (key) => {
            return PropertiesService.getScriptProperties().getProperty(key);
        },
        setCache: (key, value) => {
            PropertiesService.getScriptProperties().setProperty(key, String(value));
        },
        setCells: (range, rows) => {
            range.setValues(rows);
        },
        setCell: (rangeOfOne, value, markColor) => {
            rangeOfOne.setValue(value);
            if (markColor) rangeOfOne.setBackground(markColor);
        },
        traverse: (sheet, rows, rowNumFirstIn, colNumFirstIn, markColor, isTargeted, getUpdated, count = 0) => {
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].length; j++) {
                    const content = String(rows[i][j]);
                    if (isTargeted(content)) {
                        const rowNum = rowNumFirstIn + i;
                        const colNum = colNumFirstIn + j;
                        xy.setCell(xy.getRangeXY(sheet, rowNum, rowNum, colNum, colNum), getUpdated(content), markColor);
                        count++;
                    }
                }
            }
            return `${count} matching cells have been processed`;
        },
        parseJSONFile: (id) => {
            return JSON.parse(DriveApp.getFileById(id).getBlob().getDataAsString());
        },
        writeFileWithJSON: (id, content) => {
            DriveApp.getFileById(id).setContent(JSON.stringify(content, null, 4));
            return true;
        }
    };

    const io = ((logs = true, length = 128, prefix = 'ioLogger', context = Logger) => {
        const stream = {
            report: {
                log: (message) => {
                    if (prefix) message = `${prefix} - ${message}`;
                    (typeof context !== 'undefined' ? context : console).log(message);
                },
                cap: (string) => {
                    return string.length > length ? string.slice(0, length - 1).trim() + ' ... ' : string;
                }
            },
            core: (step, value, error) => {
                const status = error === true || value == null ? 'FAIL' : 'OK';
                stream.report.log(`${step} - ${status} - ${value}`);
            },
            shield: (step, value, error, unexpected) => {
                if (typeof step !== 'string' || step.length < 1 || step.length > length) throw new Error(`Expect string of length 1-${lenght}`);
                if (value != null) {
                    if (typeof value === 'number' && !Number.isFinite(value)) throw new Error('Expect finite');
                    if (typeof value === 'bigint') value = value.toString();
                    value = stream.report.cap(JSON.stringify(value));
                }
                if (typeof error !== 'boolean') throw new Error('Expect boolean');
                if (unexpected.length) throw new Error('Unexpected parameters');
                return [step, value, error];
            },
            control: (...unknown) => {
                const std = stream.shield(...unknown);
                if (!std[2] && !logs) return;
                stream.core(...std);
            }
        };
        return (step, value, error = false, ...unexpected) => {
            stream.control(step, value, error, unexpected);
            return value;
        };
    })();
}
