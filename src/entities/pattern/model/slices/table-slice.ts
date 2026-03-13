import { StateCreator } from 'zustand';
import { PatternState } from '../types';

export const createTableSlice: StateCreator<PatternState, [], [], Pick<PatternState, 
  | 'headerRowIndex' | 'isManualMode' | 'selectedColumns' | 'customNames' 
  | 'constraints' | 'topology' | 'anchor' | 'hiddenColumns'
  | 'setHeaderRow' | 'toggleManualMode' | 'toggleColumn' | 'updateColumnName' 
  | 'setConstraintType' | 'setTopology' | 'setStartAnchor' | 'setEndAnchor' 
  | 'toggleVisibility'
>> = (set) => ({
  // State
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

  // Actions
  setHeaderRow: (index) => set({ 
    headerRowIndex: index, 
    isManualMode: false,
    selectedColumns: [],
    constraints: [], 
    topology: {},
    anchor: { start: null, end: null },
    hiddenColumns: [] 
  }),

  toggleManualMode: () => set((state) => ({
    isManualMode: !state.isManualMode,
    headerRowIndex: null,
    selectedColumns: [],
    constraints: [],
    topology: {},
    anchor: { start: null, end: null },
    customNames: {}
  })),

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
});
