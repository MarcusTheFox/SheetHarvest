import { LayerMetadata } from "../../lib/pipeline/types";
import { columnAddLayer } from "./logic";
import { ColumnAddLayerSettings } from "./types";
import { ColumnAddConfig } from "./ui";

export const columnAddLayerMetadata: LayerMetadata<ColumnAddLayerSettings> = {
    id: 'column-add',
    name: 'Добавить колонку',
    description: 'Добавляет новую колонку с заданным значением',
    layer: columnAddLayer,
    defaultSettings: {
        columnName: '',
        value: '',
    },
    component: ColumnAddConfig,
};
