import { PipelineContext, executePipeline, ExtractionParams } from "./pipeline/core";
import {
    anchorLayer,
    headerSkipLayer,
    topologyLayer,
    constraintsLayer
} from "./pipeline/layers/filters";
import {
    projectionLayer,
    splitColumnExampleLayer
} from "./pipeline/layers/transformers";

export const extractData = (params: ExtractionParams): { rows: any[][]; headers: string[] } => {
    // 1. Инициализируем контекст с сырыми строками (оборачиваем их для сохранения оригинального индекса)
    const initialContext: PipelineContext = {
        rows: params.allRows.map((cells, idx) => ({
            originalIndex: idx,
            cells
        })),
        headers: [], // Заголовки заполнятся на слое projectionLayer
        params
    };

    // 2. Определяем слои (конвейер обработки)
    const pipelineLayers = [
        headerSkipLayer,   // 1. Пропускаем заголовки (если не ручной режим)
        anchorLayer,       // 2. Отсекаем всё, что вне якорей
        topologyLayer,     // 3. Фильтруем по топологии
        constraintsLayer,  // 4. Фильтруем по типам данных (числа, даты)
        projectionLayer,   // 5. Проекция: оставляем только нужные колонки и формируем заголовки

        // --- Здесь можно добавлять свои слои трансформации данных ---
        splitColumnExampleLayer // Пример разбиения колонки "Артикул, Штрихкод"
    ];

    // 3. Прогоняем данные через пайплайн
    const finalContext = executePipeline(initialContext, pipelineLayers);

    // 4. Возвращаем результат: чистые массивы данных и заголовки
    return {
        rows: finalContext.rows.map(r => r.cells),
        headers: finalContext.headers
    };
};
