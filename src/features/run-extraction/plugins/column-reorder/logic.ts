import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { ColumnReorderLayerSettings } from "./types";

export function columnReorderLayer(context: PipelineContext, settings: ColumnReorderLayerSettings): PipelineContext {
    const { tables, headers } = context;
    const { order } = settings;

    // Если порядок не задан или не совпадает по количеству с текущими колонками, 
    // пробуем сохранить текущий порядок, если это первая настройка
    if (order.length === 0) {
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

    const processRow = (row: PipelineRow): PipelineRow => {
        const cells = finalOrder.map(idx => row.cells[idx]);
        return {
            ...row,
            cells,
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
