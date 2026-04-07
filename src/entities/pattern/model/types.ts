import { ValidatorType } from "@/shared/lib/validators";

export type ConstraintType = ValidatorType;
export type TopologyMode = 'any' | 'filled' | 'empty';

export interface AnchorPoint {
  text: string;
  colIndex: number;
}

export interface ColumnConstraint {
  colIndex: number;
  type: ConstraintType;
  name: string; 
  pattern?: string;
  flags?: string;
}

export interface PatternAnchor {
  start: AnchorPoint | null;
  end: AnchorPoint | null;
}

export interface PipelineLayer<T = unknown> {
  id: string;
  instanceId: string;
  settings: T;
}

export interface ExtractionPattern {
  headerRowIndex: number | null;
  isManualMode: boolean;
  selectedColumns: number[];
  customNames: Record<number, string>;
  hiddenColumns: number[];
  pipeline: PipelineLayer[];
}

export interface PatternState extends ExtractionPattern {
  selectedColumns: number[];

  setHeaderRow: (index: number) => void;
  toggleManualMode: () => void;
  toggleColumn: (colIndex: number) => void;
  updateColumnName: (colIndex: number, name: string) => void;
  toggleVisibility: (colIndex: number) => void;
  loadPattern: (config: ExtractionPattern) => void;

  // Pipeline actions
  addLayer: (layerId: string) => void;
  removeLayer: (index: number) => void;
  moveLayer: (fromIndex: number, toIndex: number) => void;
  updateLayerSettings: <T = unknown>(index: number, settings: Partial<T>) => void;

  resetPattern: () => void;
}