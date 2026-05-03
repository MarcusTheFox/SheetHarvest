import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { ColumnAddLayerSettings } from "./types";

export function columnAddLayer(context: PipelineContext, settings: ColumnAddLayerSettings): PipelineContext {
    const { tables, headers } = context;
    
    if (!settings) return context;
    
    const { columnName, value } = settings;

    const updatedHeaders = [...headers, columnName || 'Новая колонка'];

    const processRow = (row: PipelineRow): PipelineRow => {
        return {
            ...row,
            cells: [...row.cells, value],
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
        headers: updatedHeaders,
        tables: newTables,
        isColumnStructureModified: true,
    };
}
