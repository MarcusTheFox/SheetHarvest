import { create } from 'zustand';
import { ExtractionPattern, ConstraintType, ColumnConstraint, TopologyMode, AnchorPoint } from './types';

interface PatternState extends ExtractionPattern {
  setHeaderRow: (index: number) => void;
  toggleManualMode: (totalCols: number) => void;
  updateColumnName: (colIndex: number, name: string) => void;
  setConstraintType: (colIndex: number, name: string, type: ConstraintType) => void;
  setTopology: (colIndex: number, mode: TopologyMode) => void;
  setStartAnchor: (point: AnchorPoint | null) => void;
  setEndAnchor: (point: AnchorPoint | null) => void;
  toggleVisibility: (colIndex: number) => void;
  resetPattern: () => void;
}

export const usePatternStore = create<PatternState>((set) => ({
  headerRowIndex: null,
  isManualMode: false,
  customNames: {},
  constraints: [],
  topology: {},
  anchor: {
    start: null,
    end: null,
  },
  hiddenColumns: [],

  setHeaderRow: (index) => set({ 
    headerRowIndex: index, 
    isManualMode: false,
    constraints: [], 
    topology: {},
    anchor: { start: null, end: null },
    hiddenColumns: [] 
  }),

  toggleManualMode: (totalCols) => set((state) => ({
    isManualMode: !state.isManualMode,
    headerRowIndex: null,
    constraints: [],
    topology: {},
    anchor: { start: null, end: null },
    customNames: !state.isManualMode ? 
      Object.fromEntries(Array.from({length: totalCols}, (_, i) => [i, String.fromCharCode(65 + i)])) : {}
  })),

  updateColumnName: (colIndex, name) => set((state) => ({
    customNames: { ...state.customNames, [colIndex]: name }
  })),

  setConstraintType: (colIndex, name, type) => set((state) => {
    const others = state.constraints.filter(c => c.colIndex !== colIndex);
    return { constraints: [...others, { colIndex, name, type }] };
  }),

  setTopology: (colIndex, mode) => set((state) => ({
    topology: { ...state.topology, [colIndex]: mode }
  })),

  setStartAnchor: (start) => set((state) => ({
    anchor: { ...state.anchor, start }
  })),

  setEndAnchor: (end) => set((state) => ({
    anchor: { ...state.anchor, end }
  })),

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
    topology: {},
    anchor: { start: null, end: null },
    hiddenColumns: [] 
  }),
}));