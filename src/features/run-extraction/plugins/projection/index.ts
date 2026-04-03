import { LayerMetadata } from "../../lib/pipeline/types";
import { projectionLayer } from "./logic";

export const projectionLayerMetadata: LayerMetadata<never> = {
    id: 'projection',
    name: 'Проекция колонок',
    description: 'Оставляет только выбранные колонки и формирует заголовки',
    isSystem: true,
    layer: projectionLayer,
}