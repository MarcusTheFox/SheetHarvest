import { PipelineContext, PipelineRow } from "../../lib/pipeline/core";
import { ColumnDeleteLayerSettings } from "./types";
import { RowValue } from "@/shared/types/spreadsheet";

export function columnDeleteLayer(context: PipelineContext, settings: ColumnDeleteLayerSettings): PipelineContext {
    const { rows, headers } = context;
    const toDelete = new Set(settings?.columnIndices ?? []);

    if (toDelete.size === 0) return context;

    // 1. Filter headers
    const nextHeaders = headers.filter((_, i) => !toDelete.has(i));

    // 2. Filter cells in rows
    const nextRows: PipelineRow[] = rows.map(row => ({
        ...row,
        cells: row.cells.reduce((result, cell, idx) => {
            let newCellIndex = idx;
            for (const deleteIndex of toDelete) {
                if (idx === deleteIndex) {
                    return result;
                }
                if (idx > deleteIndex) newCellIndex--;
            }

            result[newCellIndex] = cell;
            return result;
        }, [] as RowValue)
    }));

    return {
        ...context,
        headers: nextHeaders,
        rows: nextRows,
        isColumnStructureModified: true,
    };
};
