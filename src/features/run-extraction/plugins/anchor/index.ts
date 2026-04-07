import { LayerMetadata } from "../../lib/pipeline/types";
import { anchorLayer } from "./logic";
import { AnchorLayerSettings } from "./types";
import { AnchorConfig } from "./ui";

export const anchorLayerMetadata: LayerMetadata<AnchorLayerSettings> = {
    id: 'anchor',
    name: 'Якоря',
    description: 'Ограничивает область поиска строками между двумя маркерами',
    layer: anchorLayer,
    defaultSettings: {
        start: null,
        end: null,
    },
    component: AnchorConfig,
};