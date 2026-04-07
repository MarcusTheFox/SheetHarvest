import { LayerMetadata } from "../../lib/pipeline/types";
import { constraintsLayer } from "./logic";
import { ConstraintsLayerSettings } from "./types";
import { ConstraintsConfig } from "./ui";

export const constraintsLayerMetadata: LayerMetadata<ConstraintsLayerSettings> = {
    id: 'constraints',
    name: 'Типы данных',
    description: 'Валидирует данные в ячейках и исключает не соответствующие строки',
    layer: constraintsLayer,
    defaultSettings: {
        constraints: [],
    },
    component: ConstraintsConfig,
};