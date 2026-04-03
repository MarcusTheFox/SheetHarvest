import { LayerMetadata } from "../../lib/pipeline/types";
import { headerSkipLayer } from "./logic";

export const headerSkipLayerMetadata: LayerMetadata<never> = {
    id: 'header-skip',
    name: 'Пропуск заголовка',
    description: 'Пропускает строку заголовка и объединенные с ней ячейки',
    isSystem: true,
    layer: headerSkipLayer,
}