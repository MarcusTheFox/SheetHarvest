import { PipelineContext, ExtractionParams } from "./pipeline/core";
import { LAYER_REGISTRY } from "./pipeline/registry";
import { TableValue } from "@/shared/types/spreadsheet";
import { createInitialContext } from "./context-builder";

export const extractData = (
    params: ExtractionParams,
    cache?: Record<string, PipelineContext> // <-- Добавляем опциональный кеш
): { tables: TableValue[]; headers: string[] } => {
    
    let currentContext = createInitialContext(params);
    let startIndex = 0;

    // 1. Ищем самый "глубокий" слой, который уже есть в кеше
    if (cache) {
        // Идем с конца пайплайна к началу
        for (let i = params.pipeline.length - 1; i >= 0; i--) {
            const layer = params.pipeline[i];
            if (cache[layer.instanceId]) {
                // Нашли кеш! Берем его как стартовую точку
                currentContext = cache[layer.instanceId];
                // Начинаем выполнение со СЛЕДУЮЩЕГО слоя
                startIndex = i + 1;
                break;
            }
        }
    }

    // 2. Прогоняем данные только через оставшиеся (некешированные) слои
    for (let i = startIndex; i < params.pipeline.length; i++) {
        const entry = params.pipeline[i];
        const metadata = LAYER_REGISTRY[entry.id];
        
        if (metadata) {
            // Передаем текущий контекст в слой и обновляем его
            currentContext = metadata.layer({ ...currentContext, settings: entry.settings });
        }
    }

    if (currentContext.headers.length === 0 && currentContext.rows.length > 0) {
        const maxCols = Math.max(...currentContext.rows.map(r => r.cells.length));
        currentContext.headers = Array.from({ length: maxCols }, (_, i) => 
            String.fromCharCode(65 + i)
        );
    }

    // 3. Формируем итоговые таблицы из финального контекста
    const tablesMap = new Map<number, TableValue>();

    for (const row of currentContext.rows) {
        if (!tablesMap.has(row.groupIndex)) {
            tablesMap.set(row.groupIndex, []);
        }
        tablesMap.get(row.groupIndex)!.push(row.cells);
    }

    // 4. Возвращаем результат
    return {
        tables: Array.from(tablesMap.values()),
        headers: currentContext.headers
    };
};