import { create } from 'zustand';
import { PipelineTable } from '@/features/run-extraction/lib/pipeline/core';

interface ExtractionState {
  results: PipelineTable[];
  headers: string[];
  isExtracted: boolean;

  setResults: (data: { tables: PipelineTable[]; headers: string[] }) => void;
  clearResults: () => void;
}

export const useExtractionStore = create<ExtractionState>((set) => ({
  results: [],
  headers: [],
  isExtracted: false,

  setResults: ({ tables, headers }) => set({ results: tables, headers, isExtracted: true }),
  clearResults: () => set({ results: [], headers: [], isExtracted: false }),
}));