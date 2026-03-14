import { ExtractionLayer } from "./core";

export interface LayerMetadata {
    id: string;
    name: string;
    description: string;
    layer: ExtractionLayer;
    isSystem?: boolean;
    defaultSettings?: Record<string, any>;
}