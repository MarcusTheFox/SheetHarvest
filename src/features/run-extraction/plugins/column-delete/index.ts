import { LayerMetadata } from "../../lib/pipeline/types";
import { columnDeleteLayer } from "./logic";
import { ColumnDeleteLayerSettings } from "./types";
import { ColumnDeleteConfig } from "./ui";

export const columnDeleteLayerMetadata: LayerMetadata<ColumnDeleteLayerSettings> = {
    id: 'column-delete',
    name: 'Удаление колонок',
    description: 'Исключает выбранные колонки из дальнейшей обработки',
    layer: columnDeleteLayer,
    defaultSettings: {
        columnIndices: [],
    },
    component: ColumnDeleteConfig,
};
