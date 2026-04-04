import { LayerMetadata } from "../../lib/pipeline/types";
import { projectionLayer } from "./logic";
import { ProjectionConfig } from "./ui";

export const projectionLayerMetadata: LayerMetadata<never> = {
    id: 'projection',
    name: 'Проекция колонок',
    description: 'Оставляет только выбранные колонки и формирует заголовки',
    layer: projectionLayer,
    component: ProjectionConfig,
}