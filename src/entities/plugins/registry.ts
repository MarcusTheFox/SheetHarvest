import { anchorLayerMetadata } from "./anchor";
import { rowSkipLayerMetadata } from "./row-skip";
import { topologyLayerMetadata } from "./topology";
import { constraintsLayerMetadata } from "./constraints";
import { projectionLayerMetadata } from "./projection";
import { valueMappingLayerMetadata } from "./value-mapping";
import { regexExtractLayerMetadata } from "./regex-extract";
import { columnSplitLayerMetadata } from "./column-split";
import { columnDeleteLayerMetadata } from "./column-delete";
import { columnAddLayerMetadata } from "./column-add";
import { columnRenameLayerMetadata } from "./column-rename";
import { columnReorderLayerMetadata } from "./column-reorder";
import { LayerMetadata } from "@/shared/types/layer";
import { matrixSplitLayerMetadata } from "./matrix-split";

const allLayers = [
    anchorLayerMetadata,
    rowSkipLayerMetadata,
    topologyLayerMetadata,
    constraintsLayerMetadata,
    projectionLayerMetadata,
    valueMappingLayerMetadata,
    regexExtractLayerMetadata,
    columnSplitLayerMetadata,
    columnDeleteLayerMetadata,
    columnAddLayerMetadata,
    columnRenameLayerMetadata,
    columnReorderLayerMetadata,
    matrixSplitLayerMetadata,
] as LayerMetadata<unknown>[];


export const LAYER_REGISTRY = allLayers.reduce(( acc, layer ) => {
    acc[layer.id] = layer;
    return acc;
}, {} as Record<string, LayerMetadata<unknown>> );

export const DEFAULT_PIPELINE: string[] = [];
