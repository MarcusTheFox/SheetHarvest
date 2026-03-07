import { create } from 'zustand';
import { ExtractionPattern, ColumnConstraint, ConstraintType } from './types';

interface PatternState extends ExtractionPattern {
  setHeaderRow: (index: number) => void;
  toggleConstraint: (colIndex: number, name: string, type: ConstraintType) => void;
  resetPattern: () => void;
}

export const usePatternStore = create<PatternState>((set) => ({
  headerRowIndex: null,
  constraints: [],

  setHeaderRow: (index) => set({ headerRowIndex: index }),

  toggleConstraint: (colIndex, name, type) => set((state) => {
    const exists = state.constraints.find(c => c.colIndex === colIndex);
    if (exists && exists.type === type) {
      return { constraints: state.constraints.filter(c => c.colIndex !== colIndex) };
    }
    const newConstraint: ColumnConstraint = { colIndex, name, type };
    return { 
      constraints: [...state.constraints.filter(c => c.colIndex !== colIndex), newConstraint] 
    };
  }),

  resetPattern: () => set({ headerRowIndex: null, constraints: [] }),
}));