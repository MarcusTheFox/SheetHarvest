import { create } from 'zustand';
import { TableValue } from '@/shared/types/spreadsheet';

interface ExtractionState {
  results: TableValue;
  headers: string[];
  isExtracted: boolean;

  setResults: (data: { rows: TableValue; headers: string[] }) => void;
  clearResults: () => void;
}

export const useExtractionStore = create<ExtractionState>((set) => ({
  results: [],
  headers: [],
  isExtracted: false,

  setResults: ({ rows, headers }) => set({ results: rows, headers, isExtracted: true }),
  clearResults: () => set({ results: [], headers: [], isExtracted: false }),
}));