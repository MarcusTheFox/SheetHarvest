import { ISpreadsheetParser } from './types';
import { XLSXParser } from './xlsx-parser';
import { CSVParser } from './csv-parser';
import { XLSLegacyParser } from './xls-legacy-parser';
import { Sheet } from '@/shared/types/spreadsheet';

export const getParserForFile = (file: File): ISpreadsheetParser => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'xlsx':
    case 'xlsm':
      return new XLSXParser();
    case 'csv':
      return new CSVParser();
    case 'xls':
      return new XLSLegacyParser();
    default:
      return new XLSXParser();
  }
};

export const parseSpreadsheet = async (file: File): Promise<Sheet[]> => {
  const parser = getParserForFile(file);
  return await parser.parse(file);
};