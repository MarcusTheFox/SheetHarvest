import { PipelineContext, PipelineRow } from "../../lib/pipeline/core";
import { ColumnAddLayerSettings } from "./types";

export function columnAddLayer(context: PipelineContext<ColumnAddLayerSettings>): PipelineContext {
    const { rows, headers, settings } = context;
    
    if (!settings) return context;
    
    const { columnName, value } = settings;

    const updatedHeaders = [...headers, columnName || 'Новая колонка'];

    const updatedRows = rows.map((row): PipelineRow => ({
        ...row,
        cells: [...row.cells, value]
    }));

    return {
        ...context,
        headers: updatedHeaders,
        rows: updatedRows
    };
}
