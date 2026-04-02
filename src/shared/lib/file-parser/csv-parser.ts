import Papa from 'papaparse';
import { ISpreadsheetParser } from './types';
import { Sheet, TableValue } from '@/shared/types/spreadsheet';

export class CSVParser implements ISpreadsheetParser {
  async parse(file: File): Promise<Sheet[]> {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (results) => {
          resolve([{ 
            name: 'CSV Result', 
            data: results.data as TableValue, 
            merges: [] 
          }]);
        },
        skipEmptyLines: true,
      });
    });
  }
}