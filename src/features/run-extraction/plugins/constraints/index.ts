import { LayerMetadata } from "../../lib/pipeline/types";
import { constraintsLayer } from "./logic";

export const constraintsLayerMetadata: LayerMetadata<never> = {
    id: 'constraints',
    name: 'Типы данных',
    description: 'Валидирует данные в ячейках (числа, даты)',
    isSystem: true,
    layer: constraintsLayer,
}