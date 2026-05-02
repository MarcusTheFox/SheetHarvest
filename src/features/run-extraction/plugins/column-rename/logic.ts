import { PipelineContext } from "../../lib/pipeline/core";
import { ColumnRenameLayerSettings } from "./types";

export function columnRenameLayer(context: PipelineContext, settings: ColumnRenameLayerSettings): PipelineContext {
    const { headers } = context;

    if (!settings) return context;
    
    const { renames } = settings;

    const updatedHeaders = headers.map((header, idx) => {
        // Проверяем наличие переименования для данного индекса
        if (renames && renames[idx] !== undefined && renames[idx] !== '') {
            return renames[idx];
        }
        return header;
    });

    return {
        ...context,
        headers: updatedHeaders
    };
}
