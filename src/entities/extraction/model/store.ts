import { create } from 'zustand';

interface ExtractionState {
  results: any[][];
  isExtracted: boolean;
  
  setResults: (data: any[][]) => void;
  clearResults: () => void;
}

export const useExtractionStore = create<ExtractionState>((set) => ({
  results: [],
  isExtracted: false,
  
  setResults: (data) => set({ results: data, isExtracted: true }),
  clearResults: () => set({ results: [], isExtracted: false }),
}));