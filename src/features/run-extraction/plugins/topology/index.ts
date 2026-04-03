import { LayerMetadata } from "../../lib/pipeline/types";
import { topologyLayer } from "./logic";

export const topologyLayerMetadata: LayerMetadata<never> = {
    id: 'topology',
    name: 'Топология строк',
    description: 'Фильтрует строки по правилам заполненности колонок',
    isSystem: true,
    layer: topologyLayer,
}