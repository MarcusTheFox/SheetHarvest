export interface CellAddress {
    r: number;
    c: number;
}

export interface MergeRange {
  s: CellAddress;
  e: CellAddress;
}

export interface ParsedSheet {
  name: string;
  data: any[][];
  merges: MergeRange[];
}

export interface ISpreadsheetParser {
  parse(file: File): Promise<ParsedSheet[]>;
}