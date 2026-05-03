import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { ColumnDeleteLayerSettings } from "./types";
import { RowValue } from "@/shared/types/spreadsheet";

export function columnDeleteLayer(context: PipelineContext, settings: ColumnDeleteLayerSettings): PipelineContext {
    const { tables, headers } = context;
    const toDelete = new Set(settings?.columnIndices ?? []);

    if (toDelete.size === 0) return context;

    // 1. Filter headers
    const nextHeaders = headers.filter((_, i) => !toDelete.has(i));

    // 2. Filter cells in rows
    const processRow = (row: PipelineRow): PipelineRow => {
        const cells = row.cells.reduce((result, cell, idx) => {
            let newCellIndex = idx;
            for (const deleteIndex of toDelete) {
                if (idx === deleteIndex) {
                    return result;
                }
                if (idx > deleteIndex) newCellIndex--;
            }

            result[newCellIndex] = cell;
            return result;
        }, [] as RowValue);

        return {
            ...row,
            cells,
        }
    }

    const processTable = (table: PipelineTable): PipelineTable => {
        const rows = table.rows.map(row => processRow(row));
        return {
            ...table,
            rows,
        }
    }

    const newTables = tables.map(table => processTable(table));

    return {
        ...context,
        headers: nextHeaders,
        tables: newTables,
        isColumnStructureModified: true,
    };
};
