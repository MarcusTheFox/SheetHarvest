import { create } from 'zustand';
import { ExtractionPattern, ConstraintType, ColumnConstraint, TopologyMode, AnchorPoint } from './types';
import { DEFAULT_PIPELINE } from '@/features/run-extraction/lib/pipeline/registry';

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

  // Pipeline actions
  addLayer: (layerId: string) => void;
  removeLayer: (index: number) => void;
  moveLayer: (fromIndex: number, toIndex: number) => void;
  updateLayerSettings: (index: number, settings: Record<string, any>) => void;

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
  pipeline: DEFAULT_PIPELINE.map(id => ({
    id,
    instanceId: `${id}-${Math.random().toString(36).substr(2, 9)}`,
    settings: {}
  })),

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

  addLayer: (layerId) => set((state) => ({
    pipeline: [...state.pipeline, {
      id: layerId,
      instanceId: `${layerId}-${Math.random().toString(36).substr(2, 9)}`,
      settings: {}
    }]
  })),

  removeLayer: (index) => set((state) => ({
    pipeline: state.pipeline.filter((_, i) => i !== index)
  })),

  moveLayer: (fromIndex, toIndex) => set((state) => {
    const newPipeline = [...state.pipeline];
    const [movedItem] = newPipeline.splice(fromIndex, 1);
    newPipeline.splice(toIndex, 0, movedItem);
    return { pipeline: newPipeline };
  }),

  updateLayerSettings: (index, settings) => set((state) => {
    const newPipeline = [...state.pipeline];
    newPipeline[index] = { ...newPipeline[index], settings: { ...newPipeline[index].settings, ...settings } };
    return { pipeline: newPipeline };
  }),

  resetPattern: () => set({ 
    headerRowIndex: null, 
    isManualMode: false, 
    selectedColumns: [],
    customNames: {}, 
    constraints: [], 
    topology: {},
    anchor: { start: null, end: null },
    hiddenColumns: [],
    pipeline: DEFAULT_PIPELINE.map(id => ({
      id,
      instanceId: `${id}-${Math.random().toString(36).substr(2, 9)}`,
      settings: {}
    }))
  }),
}));