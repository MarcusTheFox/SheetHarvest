import { create } from 'zustand';
import { SpreadsheetState } from './types';

export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  sheets: [],
  currentSheetIndex: 0,

  getCurrentSheet: () => {
    const { sheets, currentSheetIndex } = get();
    return sheets.length > 0 ? sheets[currentSheetIndex] : null;
  },

  setSheets: (sheets) => set({ 
    sheets, 
    currentSheetIndex: 0 
  }),

  setCurrentSheet: (index) => set((state) => ({ 
    currentSheetIndex: Math.min(Math.max(0, index), state.sheets.length - 1) 
  })),

  reset: () => set({ 
    sheets: [], 
    currentSheetIndex: 0 
  }),
}));