import { LayerMetadata } from "@/shared/types/layer";
import { columnDeleteLayer } from "./logic";
import { ColumnDeleteLayerSettings } from "./types";
import { ColumnDeleteConfig } from "./ui";

export const columnDeleteLayerMetadata: LayerMetadata<ColumnDeleteLayerSettings> = {
    id: "column-delete",
    name: "Удаление колонок",
    description: "Исключает выбранные колонки из дальнейшей обработки",
    layer: columnDeleteLayer,
    defaultSettings: {
        columnIndices: [],
    },
    component: ColumnDeleteConfig,
};
