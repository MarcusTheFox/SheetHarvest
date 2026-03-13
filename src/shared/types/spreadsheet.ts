export interface CellAddress {
  r: number;
  c: number;
}

export interface MergeRange {
  s: CellAddress;
  e: CellAddress;
}

export type CellValue = string | number | boolean | Date | null | undefined;

export interface Sheet {
  name: string;
  data: CellValue[][];
  merges: MergeRange[];
}
