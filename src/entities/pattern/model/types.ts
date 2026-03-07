export type ConstraintType = 'not_empty' | 'is_number' | 'is_date' | 'any';

export interface ColumnConstraint {
  colIndex: number;
  type: ConstraintType;
  name: string;
}

export interface ExtractionPattern {
  headerRowIndex: number | null;
  constraints: ColumnConstraint[];
}