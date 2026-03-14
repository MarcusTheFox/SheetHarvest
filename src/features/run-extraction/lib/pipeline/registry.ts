import { filterLayers } from "./layers/filters";
import { transformerLayers } from "./layers/transformers";
import { LayerMetadata } from "./types";

const allLayers: LayerMetadata[] = [
    ...filterLayers,
    ...transformerLayers
];

export const LAYER_REGISTRY: Record<string, LayerMetadata> = allLayers.reduce((acc, layer) => {
    acc[layer.id] = layer;
    return acc;
}, {} as Record<string, LayerMetadata>);

export const DEFAULT_PIPELINE = [
    'anchor',
    'header-skip',
    'topology',
    'constraints',
    'projection'
];
