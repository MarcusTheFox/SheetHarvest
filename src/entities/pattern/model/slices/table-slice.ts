import { StateCreator } from 'zustand';
import { PatternState, ExtractionPattern } from '../types';
import { usePreviewStore } from '@/entities/preview/model/store';

export const createTableSlice: StateCreator<PatternState, [], [], Pick<PatternState, 
  | 'headerRowIndex' | 'isManualMode' | 'selectedColumns' | 'customNames' 
  | 'constraints' | 'topology' | 'anchor' | 'hiddenColumns'
  | 'setHeaderRow' | 'toggleManualMode' | 'toggleColumn' | 'updateColumnName' 
  | 'setConstraintType' | 'setTopology' | 'setStartAnchor' | 'setEndAnchor' 
  | 'toggleVisibility' | 'loadPattern'
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
  setHeaderRow: (index) => set(() => {
    usePreviewStore.getState().clearCache();
    return {
      headerRowIndex: index, 
      isManualMode: false,
      selectedColumns: [],
      constraints: [], 
      topology: {},
      anchor: { start: null, end: null },
      hiddenColumns: [] 
    }
  }),

  toggleManualMode: () => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      isManualMode: !state.isManualMode,
      headerRowIndex: null,
      selectedColumns: [],
      constraints: [],
      topology: {},
      anchor: { start: null, end: null },
      customNames: {}
    }
  }),

  toggleColumn: (colIndex) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      selectedColumns: state.selectedColumns.includes(colIndex)
        ? state.selectedColumns.filter(i => i !== colIndex)
        : [...state.selectedColumns, colIndex].sort((a, b) => a - b)
    }
  }),

  updateColumnName: (colIndex, name) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      customNames: { ...state.customNames, [colIndex]: name }
    }
  }),

  setConstraintType: (colIndex, name, type) => set((state) => {
    usePreviewStore.getState().clearCache();
    const others = state.constraints.filter(c => c.colIndex !== colIndex);
    return { constraints: [...others, { colIndex, name, type }] };
  }),

  setTopology: (colIndex, mode) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      topology: { ...state.topology, [colIndex]: mode }
    }
  }),

  setStartAnchor: (start) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      anchor: { ...state.anchor, start }
    }
  }),

  setEndAnchor: (end) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      anchor: { ...state.anchor, end }
    }
  }),

  toggleVisibility: (colIndex) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      hiddenColumns: state.hiddenColumns.includes(colIndex)
        ? state.hiddenColumns.filter(id => id !== colIndex)
        : [...state.hiddenColumns, colIndex]
    }
  }),

  loadPattern: (config) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      ...state,
      ...config,
      // Перегенерируем instanceId для слоев пайплайна, чтобы React не путался
      pipeline: config.pipeline.map(layer => ({
        ...layer,
        instanceId: `${layer.id}-${Math.random().toString(36).substr(2, 9)}`
      }))
    }
  }),
});
