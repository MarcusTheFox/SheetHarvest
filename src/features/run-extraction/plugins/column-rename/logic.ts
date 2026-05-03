import { PipelineContext } from "../../lib/pipeline/core";
import { ColumnRenameLayerSettings } from "./types";

export function columnRenameLayer(context: PipelineContext, settings: ColumnRenameLayerSettings): PipelineContext {
    const { headers } = context;
    const { renames } = settings;

    const updatedHeaders = headers.map((header, idx) => {
        if (renames && renames[idx] !== undefined && renames[idx].trim() !== '') {
            return renames[idx];
        }
        return header;
    });

    const hasChanges = updatedHeaders.some((header, idx) => header !== headers[idx]);
    if (!hasChanges) return context;

    return {
        ...context,
        headers: updatedHeaders
    };
}
