import { LayerMetadata } from "../../lib/pipeline/types";
import { columnSplitLayer } from "./logic";
import { ColumnSplitLayerSettings } from "./types";

export const columnSplitLayerMetadata: LayerMetadata<ColumnSplitLayerSettings> = {
    id: 'column-split',
    name: 'Разделение колонки',
    description: 'Разбивает одну колонку на две или более по символу или Regex',
    layer: columnSplitLayer,
    defaultSettings: {
        mode: 'delimiter',
        delimiter: ',',
        newNames: ['Часть 1', 'Часть 2'],
        sourceColIndex: 0
    }
}