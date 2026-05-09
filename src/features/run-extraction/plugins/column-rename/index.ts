import { LayerMetadata } from "@/shared/types/layer";
import { columnRenameLayer } from "./logic";
import { ColumnRenameLayerSettings } from "./types";
import { ColumnRenameConfig } from "./ui";

export const columnRenameLayerMetadata: LayerMetadata<ColumnRenameLayerSettings> = {
    id: "column-rename",
    name: "Переименовать колонки",
    description: "Изменяет названия выбранных колонок",
    layer: columnRenameLayer,
    defaultSettings: {
        renames: {},
    },
    component: ColumnRenameConfig,
};
