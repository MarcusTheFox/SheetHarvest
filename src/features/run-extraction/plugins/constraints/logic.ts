import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { ColumnConstraint } from "@/entities/pattern/model/types";
import { validators } from "@/shared/lib/validators";
import { ConstraintsLayerSettings } from "./types";

export function constraintsLayer(context: PipelineContext, settings: ConstraintsLayerSettings): PipelineContext {
    const { tables } = context;
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

    const processTable = (table: PipelineTable): PipelineTable => {
        const rows = table.rows.filter(row => checkConstraints(row.cells, constraints));
        return {
            ...table,
            rows,
        }
    }

    const newTables = tables.map(table => processTable(table));

    return { ...context, tables: newTables };
};
