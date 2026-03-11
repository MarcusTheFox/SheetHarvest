import { create } from 'zustand';
import { ExtractionPattern, ConstraintType, ColumnConstraint, TopologyMode, AnchorPoint } from './types';

interface PatternState extends ExtractionPattern {
  selectedColumns: number[];

  setHeaderRow: (index: number) => void;
  toggleManualMode: () => void;
  toggleColumn: (colIndex: number) => void;
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
  selectedColumns: [],
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
    selectedColumns: [],
    constraints: [], 
    topology: {},
    anchor: { start: null, end: null },
    hiddenColumns: [] 
  }),

  // Переключение ручного режима — колонки сбрасываются, пользователь добавляет их сам
  toggleManualMode: () => set((state) => ({
    isManualMode: !state.isManualMode,
    headerRowIndex: null,
    selectedColumns: [],
    constraints: [],
    topology: {},
    anchor: { start: null, end: null },
    customNames: {}
  })),

  // Добавить/убрать колонку из паттерна (в ручном режиме)
  toggleColumn: (colIndex) => set((state) => ({
    selectedColumns: state.selectedColumns.includes(colIndex)
      ? state.selectedColumns.filter(i => i !== colIndex)
      : [...state.selectedColumns, colIndex].sort((a, b) => a - b)
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
    selectedColumns: [],
    customNames: {}, 
    constraints: [], 
    topology: {},
    anchor: { start: null, end: null },
    hiddenColumns: [] 
  }),
}));