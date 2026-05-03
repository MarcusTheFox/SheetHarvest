import { LayerMetadata } from "../../lib/pipeline/types";
import { matrixSplitLayer } from "./logic";
import { MatrixSplitLayerSettings } from "./types";
import { MatrixSplitConfig } from "./ui";

export const matrixSplitLayerMetadata: LayerMetadata<MatrixSplitLayerSettings> = {
    id: 'matrix-split',
    name: 'Разделение матрицы',
    description: 'Разделяет таблицу на несколько на основе колонок-показателей. Полезно для прайс-листов с остатками по разным складам.',
    layer: matrixSplitLayer,
    component: MatrixSplitConfig,
    defaultSettings: {
        fixedColIndices: [],
        gridColIndices: [],
        valueColumnName: "Без названия"
    }
};