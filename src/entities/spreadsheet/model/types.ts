import { Sheet } from '@/shared/types/spreadsheet';

export interface SpreadsheetState {
  sheets: Sheet[];
  currentSheetIndex: number;
  getCurrentSheet: () => Sheet | null;
  setSheets: (sheets: Sheet[]) => void;
  setCurrentSheet: (index: number) => void;
  reset: () => void;
}
