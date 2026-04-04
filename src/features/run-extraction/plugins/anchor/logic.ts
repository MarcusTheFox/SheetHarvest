import { PipelineContext } from "../../lib/pipeline/core";
import { AnchorLayerSettings } from "./types";

export function anchorLayer(context: PipelineContext<AnchorLayerSettings>): PipelineContext {
    const { rows, settings } = context;
    const anchor = settings ?? { start: null, end: null };

    let isSearchActive = !anchor.start;
    let groupIndex = 0;
    const filteredRows: typeof rows = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Проверка стартового якоря
        if (anchor.start && anchor.start.text && !isSearchActive) {
            const cellValue = row.cells[anchor.start.colIndex]?.toString();
            if (cellValue && cellValue.includes(anchor.start.text)) {
                isSearchActive = true;
                continue; // Строку со стартовым якорем пропускаем
            }
        }
        
        // Проверка конечного якоря
        if (anchor.end && anchor.end.text && isSearchActive) {
            const cellValue = row.cells[anchor.end.colIndex]?.toString();
            if (cellValue && cellValue.includes(anchor.end.text)) {
                isSearchActive = false;
                groupIndex++;
                continue;
            }
        }

        if (isSearchActive) {
            filteredRows.push({ ...row, groupIndex });
        }
    }

    return { ...context, rows: filteredRows };
};