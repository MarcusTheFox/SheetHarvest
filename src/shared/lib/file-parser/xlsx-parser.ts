import ExcelJS from 'exceljs';
import { ISpreadsheetParser, ParsedSheet, MergeRange, CellAddress } from './types';

export class XLSXParser implements ISpreadsheetParser {
  async parse(file: File): Promise<ParsedSheet[]> {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);

    const result: ParsedSheet[] = [];
    workbook.eachSheet((worksheet) => {
      const sheetData: any[][] = [];
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        const rowValues = Array.isArray(row.values) ? row.values.slice(1) : [];
        
        const cleanRow = rowValues.map(cell => {
          if (cell && typeof cell === 'object') {
            if (cell instanceof Date) return cell;
            if ('result' in cell) return cell.result ?? "";
            if ('text' in cell) return cell.text ?? "";
            if ('richText' in cell && Array.isArray(cell.richText)) {
              return cell.richText.map(rt => rt.text).join("");
            }
            return JSON.stringify(cell);
          }

          return cell;
        });

        sheetData.push(cleanRow);
      });

      const merges: MergeRange[] = (worksheet.model.merges || []).map((rangeStr): MergeRange => {
        const [start, end] = rangeStr.split(':').map(( addr ): CellAddress => {
          const cell = worksheet.getCell(addr);
          return { r: Number(cell.row) - 1, c: Number(cell.col) - 1 };
        });
        return { s: start, e: end || start };
      });

      result.push({ name: worksheet.name, data: sheetData, merges });
    });

    return result;
  }
}