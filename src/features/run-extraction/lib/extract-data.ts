import { PipelineContext, executePipeline, ExtractionParams } from "./pipeline/core";
import { LAYER_REGISTRY } from "./pipeline/registry";
import { TableValue } from "@/shared/types/spreadsheet";

export const extractData = (params: ExtractionParams): { rows: TableValue; headers: string[] } => {
    // 1. Инициализируем контекст с сырыми строками (оборачиваем их для сохранения оригинального индекса)
    const initialContext: PipelineContext = {
        rows: params.allRows.map((cells, idx) => ({
            originalIndex: idx,
            cells
        })),
        headers: [], // Заголовки заполнятся на слое projectionLayer
        params
    };

    // 2. Определяем слои (конвейер обработки) на основе настроек из параметров
    const pipelineLayers = params.pipeline
        .map(entry => {
            const metadata = LAYER_REGISTRY[entry.id];
            if (!metadata) return null;

            // Оборачиваем слой, чтобы передать ему настройки конкретного экземпляра
            return (ctx: PipelineContext) => metadata.layer({ ...ctx, settings: entry.settings });
        })
        .filter((layer): layer is (ctx: PipelineContext) => PipelineContext => layer !== null);

    // 3. Прогоняем данные через пайплайн
    const finalContext = executePipeline(initialContext, pipelineLayers);

    // 4. Возвращаем результат: чистые массивы данных и заголовки
    return {
        rows: finalContext.rows.map(r => r.cells),
        headers: finalContext.headers
    };
};
