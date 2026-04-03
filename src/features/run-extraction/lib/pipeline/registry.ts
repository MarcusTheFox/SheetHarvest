import { anchorLayerMetadata } from "../../plugins/anchor";
import { columnSplitLayerMetadata } from "../../plugins/column-split";
import { constraintsLayerMetadata } from "../../plugins/constraints";
import { headerSkipLayerMetadata } from "../../plugins/header-skip";
import { projectionLayerMetadata } from "../../plugins/projection";
import { regexExtractLayerMetadata } from "../../plugins/regex-extract";
import { topologyLayerMetadata } from "../../plugins/topology";
import { valueMappingLayerMetadata } from "../../plugins/value-mapping";
import { LayerMetadata } from "./types";

const allLayers = [
    // anchorLayerMetadata,
    // headerSkipLayerMetadata,
    // topologyLayerMetadata,
    // constraintsLayerMetadata,
    // projectionLayerMetadata,
    // valueMappingLayerMetadata,
    // regexExtractLayerMetadata,
    // columnSplitLayerMetadata,
] as LayerMetadata<unknown>[];

export const LAYER_REGISTRY = allLayers.reduce((acc, layer) => {
    acc[layer.id] = layer;
    return acc;
}, {} as Record<string, LayerMetadata<unknown>>);

export const DEFAULT_PIPELINE = [
    // 'anchor',
    // 'header-skip',
    // 'topology',
    // 'constraints',
    // 'projection'
];
