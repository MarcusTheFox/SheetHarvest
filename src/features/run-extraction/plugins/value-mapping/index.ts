import { LayerMetadata } from "../../lib/pipeline/types";
import { valueMappingLayer } from "./logic";
import { ValueMappingLayerSettings } from "./types";
import { ValueMappingConfig } from "./ui";

export const valueMappingLayerMetadata: LayerMetadata<ValueMappingLayerSettings> = {
    id: 'value-mapping',
    name: 'Сопоставление значений',
    description: 'Заменяет значения в колонках по глобальному словарю из базы данных',
    layer: valueMappingLayer,
    component: ValueMappingConfig,
}