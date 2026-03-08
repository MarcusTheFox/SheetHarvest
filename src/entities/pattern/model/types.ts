export type ConstraintType = 'not_empty' | 'is_number' | 'is_date' | 'any';
export type TopologyMode = 'any' | 'filled' | 'empty'; // Режимы топологии

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
  topology: Record<number, TopologyMode>; // Новое поле: структурные правила
  hiddenColumns: number[];
}