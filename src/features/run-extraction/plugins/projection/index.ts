import { LayerMetadata } from "../../lib/pipeline/types";
import { projectionLayer } from "./logic";
import { ProjectionLayerSettings } from "./types";
import { ProjectionConfig } from "./ui";

export const projectionLayerMetadata: LayerMetadata<ProjectionLayerSettings> = {
    id: 'projection',
    name: 'Проекция колонок',
    description: 'Определяет структуру таблицы: выбирает нужные столбцы и задает их имена',
    layer: projectionLayer,
    component: ProjectionConfig,
    defaultSettings: {
        mode: 'auto',
        headerRowIndex: 0,
        columns: []
    }
}