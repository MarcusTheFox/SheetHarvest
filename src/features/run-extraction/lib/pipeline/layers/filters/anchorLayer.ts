import { PipelineContext } from "../../core";
import { LayerMetadata } from "../../types";

export const anchorLayerMetadata: LayerMetadata<never> = {
    id: 'anchor',
    name: 'Якоря',
    description: 'Ограничивает область поиска',
    isSystem: true,
    layer: anchorLayer
};

export function anchorLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;
    const { anchor } = params;

    let isSearchActive = !anchor.start;
    let groupIndex = 0;
    const filteredRows: typeof rows = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Проверка стартового якоря
        if (anchor.start && !isSearchActive) {
            const cellValue = row.cells[anchor.start.colIndex]?.toString();
            if (cellValue === anchor.start.text) {
                isSearchActive = true;
                continue; // Строку со стартовым якорем пропускаем
            }
        }
        
        // Проверка конечного якоря
        if (anchor.end && isSearchActive) {
            const cellValue = row.cells[anchor.end.colIndex]?.toString();
            if (cellValue === anchor.end.text) {
                isSearchActive = false;
                groupIndex++;
                continue;
            }
        }

        if (isSearchActive) {
            filteredRows.push({
                ...row,
                groupIndex,
            });
        }
    }

    return { ...context, rows: filteredRows };
};