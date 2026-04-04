import { PipelineContext, PipelineRow } from "../../lib/pipeline/core";
import { RowSkipLayerSettings } from "./types";

export function rowSkipLayer(context: PipelineContext<RowSkipLayerSettings>): PipelineContext {
    const { rows, settings } = context;
    const skipCount = settings?.skipCount ?? 1;

    if (skipCount <= 0) return context;

    // Group rows by groupIndex, skip first N rows in each group
    const groupsMap = new Map<number, PipelineRow[]>();
    rows.forEach(row => {
        if (!groupsMap.has(row.groupIndex)) {
            groupsMap.set(row.groupIndex, []);
        }
        groupsMap.get(row.groupIndex)!.push(row);
    });

    const processedRows: PipelineRow[] = [];
    groupsMap.forEach((groupRows) => {
        for (let i = skipCount; i < groupRows.length; i++) {
            processedRows.push(groupRows[i]);
        }
    });

    return { ...context, rows: processedRows };
};
