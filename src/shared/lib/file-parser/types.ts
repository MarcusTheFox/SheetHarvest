import { Sheet } from '../../types/spreadsheet';

export interface ISpreadsheetParser {
  parse(file: File): Promise<Sheet[]>;
}