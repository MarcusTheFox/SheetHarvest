import { ExtractionLayer } from "./core";

export interface LayerMetadata<T> {
    id: string;
    name: string;
    description: string;
    layer: ExtractionLayer<T>;
    isSystem?: boolean;
    defaultSettings?: T;
}