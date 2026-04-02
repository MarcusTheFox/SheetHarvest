import * as XLSX from 'xlsx';
import { ISpreadsheetParser } from './types';
import { Sheet, MergeRange, TableValue } from '@/shared/types/spreadsheet';

export class XLSLegacyParser implements ISpreadsheetParser {
  async parse(file: File): Promise<Sheet[]> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    return workbook.SheetNames.map(name => {
      const sheet = workbook.Sheets[name];

      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as TableValue;
      
      const merges: MergeRange[] = (sheet['!merges'] || []).map((merge): MergeRange => ({
        s: { r: merge.s.r, c: merge.s.c },
        e: { r: merge.e.r, c: merge.e.c }
      }));

      return { name, data, merges };
    });
  }
}