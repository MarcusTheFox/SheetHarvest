import { filterLayers } from "./layers/filters";
import { transformerLayers } from "./layers/transformers";
import { LayerMetadata } from "./types";

const allLayers = [
    ...filterLayers,
    ...transformerLayers
] as LayerMetadata<unknown>[];

export const LAYER_REGISTRY = allLayers.reduce((acc, layer) => {
    acc[layer.id] = layer;
    return acc;
}, {} as Record<string, LayerMetadata<unknown>>);

export const DEFAULT_PIPELINE = [
    'anchor',
    'header-skip',
    'topology',
    'constraints',
    'projection'
];
