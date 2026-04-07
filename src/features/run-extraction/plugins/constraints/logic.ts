import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineContext } from "../../lib/pipeline/core";
import { ColumnConstraint } from "@/entities/pattern/model/types";
import { validators } from "@/shared/lib/validators";
import { ConstraintsLayerSettings } from "./types";

export function constraintsLayer(context: PipelineContext<ConstraintsLayerSettings>): PipelineContext {
    const { rows, settings } = context;
    const constraints = settings?.constraints ?? [];

    if (constraints.length === 0) return context;

    const checkConstraints = (row: RowValue, constraints: ColumnConstraint[]): boolean => {
        return constraints.every((constraint) => {
            const cellValue = row[constraint.colIndex];
            const isEmpty = cellValue === null || cellValue === undefined || cellValue.toString().trim() === '';
            if (isEmpty && constraint.type !== 'not_empty') {
                return true;
            }
            return validators[constraint.type](cellValue, constraint);
        });
    };

    return {
        ...context,
        rows: rows.filter(r => checkConstraints(r.cells, constraints))
    };
};
