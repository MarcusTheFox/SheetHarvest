import { PipelineContext } from "../../lib/pipeline/core";
import { ColumnDeleteLayerSettings } from "./types";

export function columnDeleteLayer(context: PipelineContext<ColumnDeleteLayerSettings>): PipelineContext {
    const { rows, headers, settings } = context;
    const toDelete = new Set(settings?.columnIndices ?? []);

    if (toDelete.size === 0) return context;

    // 1. Filter headers
    const nextHeaders = headers.filter((_, i) => !toDelete.has(i));

    // 2. Filter cells in rows
    const nextRows = rows.map(row => ({
        ...row,
        cells: row.cells.filter((_, i) => !toDelete.has(i))
    }));

    return {
        ...context,
        headers: nextHeaders,
        rows: nextRows
    };
};
