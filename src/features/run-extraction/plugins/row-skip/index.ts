import { LayerMetadata } from "../../lib/pipeline/types";
import { rowSkipLayer } from "./logic";
import { RowSkipLayerSettings } from "./types";
import { RowSkipConfig } from "./ui";

export const rowSkipLayerMetadata: LayerMetadata<RowSkipLayerSettings> = {
    id: 'row-skip',
    name: 'Пропуск строк',
    description: 'Пропускает первые N строк в каждой группе данных',
    layer: rowSkipLayer,
    defaultSettings: {
        skipCount: 1,
    },
    component: RowSkipConfig,
};
