import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { RowSkipLayerSettings } from "./types";

export function rowSkipLayer(context: PipelineContext, settings: RowSkipLayerSettings): PipelineContext {
    const { tables } = context;
    const skipCount = settings.skipCount ?? 1;

    if (skipCount <= 0) return context;

    const processTable = (table: PipelineTable): PipelineTable => {
        const rows = table.rows.slice(skipCount)
        return {
            ...table,
            rows,
        }
    }

    const newTables = tables.map(table => processTable(table));

    return { ...context, tables: newTables };
};
