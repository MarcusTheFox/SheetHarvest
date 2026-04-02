export interface CellAddress {
  r: number;
  c: number;
}

export interface MergeRange {
  s: CellAddress;
  e: CellAddress;
}

export type CellValue = string | number | boolean | Date | null | undefined;
export type RowValue = CellValue[];
export type TableValue = RowValue[];

export interface Sheet {
  name: string;
  data: TableValue;
  merges: MergeRange[];
}
