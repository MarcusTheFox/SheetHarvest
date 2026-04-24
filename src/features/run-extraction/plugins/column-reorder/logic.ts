import { PipelineContext, PipelineRow } from "../../lib/pipeline/core";
import { ColumnReorderLayerSettings } from "./types";

export function columnReorderLayer(context: PipelineContext<ColumnReorderLayerSettings>): PipelineContext {
    const { rows, headers, settings } = context;

    if (!settings) return context;
    
    const { order } = settings;

    // Если порядок не задан или не совпадает по количеству с текущими колонками, 
    // пробуем сохранить текущий порядок, если это первая настройка
    if (!order || order.length === 0) {
        return context;
    }

    // Фильтруем индексы, которые могли стать невалидными после изменений в предыдущих слоях
    const validOrder = order.filter(idx => idx >= 0 && idx < headers.length);
    
    // Если после фильтрации порядок пустой, возвращаем контекст
    if (validOrder.length === 0) return context;

    // Добавляем недостающие индексы в конец (если в настройках меньше колонок, чем есть сейчас)
    const missingIndices = headers
        .map((_, idx) => idx)
        .filter(idx => !validOrder.includes(idx));
    
    const finalOrder = [...validOrder, ...missingIndices];

    const updatedHeaders = finalOrder.map(idx => headers[idx]);

    const updatedRows = rows.map((row): PipelineRow => ({
        ...row,
        cells: finalOrder.map(idx => row.cells[idx])
    }));

    return {
        ...context,
        headers: updatedHeaders,
        rows: updatedRows,
        isColumnStructureModified: true,
    };
}
