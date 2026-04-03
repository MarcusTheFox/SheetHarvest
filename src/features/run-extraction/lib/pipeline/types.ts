import { ExtractionLayer } from "./core";

export interface LayerConfigProps<T = unknown> {
    settings: T;
    onUpdate?: (settings: Partial<T>) => void;
}

export interface LayerMetadata<T> {
    id: string;
    name: string;
    description: string;
    layer: ExtractionLayer<T>;
    isSystem?: boolean;
    defaultSettings?: T;
    component?: React.FC<LayerConfigProps<T>>;
}