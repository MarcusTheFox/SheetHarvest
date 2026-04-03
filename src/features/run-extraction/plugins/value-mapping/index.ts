import { LayerMetadata } from "../../lib/pipeline/types";
import { valueMappingLayer } from "./logic";
import { ValueMappingLayerSettings } from "./types";

export const valueMappingLayerMetadata: LayerMetadata<ValueMappingLayerSettings> = {
    id: 'value-mapping',
    name: 'Сопоставление значений',
    description: 'Заменяет значения в колонках по загруженному справочнику',
    layer: valueMappingLayer,
}