import { projectionLayerMetadata } from './projectionLayer';
import { valueMappingLayerMetadata } from './valueMappingLayer';
import { regexExtractLayerMetadata } from './regexExtractLayer';
import { columnSplitLayerMetadata } from './columnSplitLayer';

export const transformerLayers = [
    projectionLayerMetadata,
    valueMappingLayerMetadata,
    regexExtractLayerMetadata,
    columnSplitLayerMetadata,
];