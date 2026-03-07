import { create } from 'zustand';
import { ExtractionPattern, ConstraintType, ColumnConstraint } from './types';

interface PatternState extends ExtractionPattern {
  setHeaderRow: (index: number) => void;
  setConstraintType: (colIndex: number, name: string, type: ConstraintType) => void;
  toggleVisibility: (colIndex: number) => void;
  resetPattern: () => void;
}

export const usePatternStore = create<PatternState>((set) => ({
  headerRowIndex: null,
  constraints: [],
  hiddenColumns: [],

  setHeaderRow: (index) => set({ 
    headerRowIndex: index, 
    constraints: [], 
    hiddenColumns: [] 
  }),

  // Теперь мы просто меняем тип, не удаляя объект из массива
  setConstraintType: (colIndex, name, type) => set((state) => {
    const others = state.constraints.filter(c => c.colIndex !== colIndex);
    const newConstraint: ColumnConstraint = { colIndex, name, type };
    return { constraints: [...others, newConstraint] };
  }),

  // Переключатель: скрыть/показать колонку в результатах
  toggleVisibility: (colIndex) => set((state) => {
    const isHidden = state.hiddenColumns.includes(colIndex);
    return {
      hiddenColumns: isHidden 
        ? state.hiddenColumns.filter(id => id !== colIndex)
        : [...state.hiddenColumns, colIndex]
    };
  }),

  resetPattern: () => set({ headerRowIndex: null, constraints: [], hiddenColumns: [] }),
}));