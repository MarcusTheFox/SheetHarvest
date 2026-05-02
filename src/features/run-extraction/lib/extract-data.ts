import { PipelineContext, PipelineTable } from "./pipeline/core";
import { LAYER_REGISTRY } from "./pipeline/registry";
import { createInitialContext } from "./context-builder";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { createHeadersFromTables } from "./pipeline/utils";

export const extractData = (
    sourceTables: PipelineTable[],
    pipeline: PipelineLayer[],
    cache?: Record<string, PipelineContext> // <-- Добавляем опциональный кеш
): { tables: PipelineTable[]; headers: string[] } => {
    
    let currentContext = createInitialContext(sourceTables);
    let startIndex = 0;

    // 1. Ищем самый "глубокий" слой, который уже есть в кеше
    if (cache) {
        // Идем с конца пайплайна к началу
        for (let i = pipeline.length - 1; i >= 0; i--) {
            const layer = pipeline[i];
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
    for (let i = startIndex; i < pipeline.length; i++) {
        const entry = pipeline[i];
        const metadata = LAYER_REGISTRY[entry.id];
        
        if (metadata) {
            // Передаем текущий контекст в слой и обновляем его
            currentContext = metadata.layer({ ...currentContext }, entry.settings );
        }
    }

    if (currentContext.headers.length === 0 && currentContext.tables.length > 0) {
        currentContext.headers = createHeadersFromTables(currentContext.tables);
    }

    // 4. Возвращаем результат
    return {
        tables: currentContext.tables,
        headers: currentContext.headers
    };
};