import { create } from 'zustand';
import { ExtractionPattern, ConstraintType, ColumnConstraint } from './types';

interface PatternState extends ExtractionPattern {
  setHeaderRow: (index: number) => void;
  toggleManualMode: (totalCols: number) => void;
  updateColumnName: (colIndex: number, name: string) => void;
  setConstraintType: (colIndex: number, name: string, type: ConstraintType) => void;
  toggleVisibility: (colIndex: number) => void;
  resetPattern: () => void;
}

export const usePatternStore = create<PatternState>((set) => ({
  headerRowIndex: null,
  isManualMode: false,
  customNames: {},
  constraints: [],
  hiddenColumns: [],

  setHeaderRow: (index) => set({ 
    headerRowIndex: index, 
    isManualMode: false,
    constraints: [], 
    hiddenColumns: [] 
  }),

  toggleManualMode: (totalCols) => set((state) => ({
    isManualMode: !state.isManualMode,
    headerRowIndex: null,
    constraints: [],
    customNames: !state.isManualMode ? 
      Object.fromEntries(Array.from({length: totalCols}, (_, i) => [i, String.fromCharCode(65 + i)])) 
      : {}
  })),

  updateColumnName: (colIndex, name) => set((state) => ({
    customNames: { ...state.customNames, [colIndex]: name }
  })),

  setConstraintType: (colIndex, name, type) => set((state) => {
    const others = state.constraints.filter(c => c.colIndex !== colIndex);
    return { constraints: [...others, { colIndex, name, type }] };
  }),

  toggleVisibility: (colIndex) => set((state) => ({
    hiddenColumns: state.hiddenColumns.includes(colIndex)
      ? state.hiddenColumns.filter(id => id !== colIndex)
      : [...state.hiddenColumns, colIndex]
  })),

  resetPattern: () => set({ 
    headerRowIndex: null, 
    isManualMode: false, 
    customNames: {}, 
    constraints: [], 
    hiddenColumns: [] 
  }),
}));