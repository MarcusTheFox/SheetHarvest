import { LayerMetadata } from "../../lib/pipeline/types";
import { columnReorderLayer } from "./logic";
import { ColumnReorderLayerSettings } from "./types";
import { ColumnReorderConfig } from "./ui";

export const columnReorderLayerMetadata: LayerMetadata<ColumnReorderLayerSettings> = {
    id: 'column-reorder',
    name: 'Изменить порядок колонок',
    description: 'Позволяет переставить колонки местами',
    layer: columnReorderLayer,
    defaultSettings: {
        order: [],
    },
    component: ColumnReorderConfig,
};
