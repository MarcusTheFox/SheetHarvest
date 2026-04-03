import { LayerMetadata } from "../../lib/pipeline/types";
import { anchorLayer } from "./logic";

export const anchorLayerMetadata: LayerMetadata<never> = {
    id: 'anchor',
    name: 'Якоря',
    description: 'Ограничивает область поиска',
    isSystem: true,
    layer: anchorLayer
};