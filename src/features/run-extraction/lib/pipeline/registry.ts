import { anchorLayerMetadata } from "../../plugins/anchor";
import { rowSkipLayerMetadata } from "../../plugins/row-skip";
import { topologyLayerMetadata } from "../../plugins/topology";
import { constraintsLayerMetadata } from "../../plugins/constraints";
import { projectionLayerMetadata } from "../../plugins/projection";
import { valueMappingLayerMetadata } from "../../plugins/value-mapping";
import { regexExtractLayerMetadata } from "../../plugins/regex-extract";
import { columnSplitLayerMetadata } from "../../plugins/column-split";
import { columnDeleteLayerMetadata } from "../../plugins/column-delete";
import { columnAddLayerMetadata } from "../../plugins/column-add";
import { columnRenameLayerMetadata } from "../../plugins/column-rename";
import { columnReorderLayerMetadata } from "../../plugins/column-reorder";
import { LayerMetadata } from "./types";
import { matrixSplitLayerMetadata } from "../../plugins/matrix-split";

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


export const LAYER_REGISTRY = allLayers.reduce((acc, layer) => {
    acc[layer.id] = layer;
    return acc;
}, {} as Record<string, LayerMetadata<unknown>>);

export const DEFAULT_PIPELINE: string[] = [];
