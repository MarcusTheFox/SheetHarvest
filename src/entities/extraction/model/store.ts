import { create } from 'zustand';
import { CellValue } from '@/shared/types/spreadsheet';

interface ExtractionState {
  results: CellValue[][];
  headers: string[];
  isExtracted: boolean;

  setResults: (data: { rows: CellValue[][]; headers: string[] }) => void;
  clearResults: () => void;
}

export const useExtractionStore = create<ExtractionState>((set) => ({
  results: [],
  headers: [],
  isExtracted: false,

  setResults: ({ rows, headers }) => set({ results: rows, headers, isExtracted: true }),
  clearResults: () => set({ results: [], headers: [], isExtracted: false }),
}));