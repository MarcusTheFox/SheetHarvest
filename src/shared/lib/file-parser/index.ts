import { ISpreadsheetParser, ParsedSheet } from './types';
import { XLSXParser } from './xlsx-parser';
import { CSVParser } from './csv-parser';
import { XLSLegacyParser } from './xls-legacy-parser';

export type { ParsedSheet, MergeRange } from './types';

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

export const parseSpreadsheet = async (file: File): Promise<ParsedSheet[]> => {
  const parser = getParserForFile(file);
  return await parser.parse(file);
};