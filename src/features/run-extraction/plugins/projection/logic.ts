import { PipelineContext, PipelineRow } from "../../lib/pipeline/core";
import { ProjectionLayerSettings, ProjectionColumn } from "./types";

export function projectionLayer(context: PipelineContext<ProjectionLayerSettings>): PipelineContext {
    const { rows, headers, settings } = context;

    if (!settings) {
        return context;
    }
    
    let targetColumns: ProjectionColumn[] = [];

    if (settings.mode === 'manual') {
        // В ручном режиме просто берем то, что настроил пользователь
        targetColumns = settings.columns || [];
    } else {
        // В автоматическом режиме ищем строку-заголовок в текущем наборе строк
        const hIdx = settings.headerRowIndex - 1;
        // Ищем строку по originalIndex, так как до проекции индексы строк еще "сырые"
        const headerRow = rows.find(r => r.originalIndex === hIdx);
        
        if (headerRow) {
            headerRow.cells.forEach((cell, idx) => {
                const val = cell?.toString().trim();
                // Если ячейка в строке заголовка не пуста - фиксируем колонку
                if (val) {
                    targetColumns.push({
                        index: idx,
                        name: val 
                    });
                }
            });
        }
    }

    // Если ничего не выбрано, возвращаем контекст как есть, чтобы не "сломать" данные
    if (targetColumns.length === 0) return context;

    // Формируем новые заголовки
    const nextHeaders = targetColumns.map(col => {
        return col.name || headers[col.index] || `Col ${col.index}`;
    });

    // Трансформируем строки: оставляем только выбранные ячейки
    const nextRows = rows.map((row): PipelineRow => ({
        ...row,
        cells: targetColumns.map(col => row.cells[col.index])
    }));

    return {
        ...context,
        headers: nextHeaders,
        rows: nextRows,
        isColumnStructureModified: true,
    };
}