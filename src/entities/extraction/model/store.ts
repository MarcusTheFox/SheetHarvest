import { create } from 'zustand';

interface ExtractionState {
  results: any[][];
  headers: string[];
  isExtracted: boolean;

  setResults: (data: { rows: any[][]; headers: string[] }) => void;
  clearResults: () => void;
}

export const useExtractionStore = create<ExtractionState>((set) => ({
  results: [],
  headers: [],
  isExtracted: false,

  setResults: ({ rows, headers }) => set({ results: rows, headers, isExtracted: true }),
  clearResults: () => set({ results: [], headers: [], isExtracted: false }),
}));