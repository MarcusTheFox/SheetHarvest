import { ValidatorType } from "@/shared/lib/validators";

export type ConstraintType = ValidatorType;

export interface ColumnConstraint {
  colIndex: number;
  type: ConstraintType;
  pattern?: string;
}

export interface ConstraintsLayerSettings {
    constraints: ColumnConstraint[];
}
