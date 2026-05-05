import { create } from 'zustand';
import { Sheet } from '@/shared/types/spreadsheet';

export interface SpreadsheetState {
  sheets: Sheet[];
  setSheets: (sheets: Sheet[]) => void;
  reset: () => void;
}

export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  sheets: [],

  setSheets: (sheets) => set({ sheets }),
  reset: () => set({ sheets: [] }),
}));