export type ConstraintType = 'not_empty' | 'is_number' | 'is_date' | 'any';
export type TopologyMode = 'any' | 'filled' | 'empty';

export interface AnchorPoint {
  text: string;
  colIndex: number;
}

export interface ColumnConstraint {
  colIndex: number;
  type: ConstraintType;
  name: string; 
}

export interface ExtractionPattern {
  headerRowIndex: number | null;
  isManualMode: boolean;
  customNames: Record<number, string>;
  constraints: ColumnConstraint[];
  topology: Record<number, TopologyMode>;
  anchor: {
    start: AnchorPoint | null;
    end: AnchorPoint | null;
  };
  hiddenColumns: number[];
  pipeline: Array<{
    id: string;
    instanceId: string;
    settings: Record<string, any>;
  }>;
}