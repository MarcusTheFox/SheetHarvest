import Papa from 'papaparse';
import { ISpreadsheetParser, ParsedSheet } from './types';

export class CSVParser implements ISpreadsheetParser {
  async parse(file: File): Promise<ParsedSheet[]> {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (results) => {
          resolve([{ 
            name: 'CSV Result', 
            data: results.data as any[][], 
            merges: [] 
          }]);
        },
        skipEmptyLines: true,
      });
    });
  }
}