import { LayerMetadata } from "@/shared/types/layer";
import { topologyLayer } from "./logic";
import { TopologyLayerSettings } from "./types";
import { TopologyConfig } from "./ui";

export const topologyLayerMetadata: LayerMetadata<TopologyLayerSettings> = {
    id: "topology",
    name: "Топология строк",
    description: "Фильтрует строки по требованиям заполненности колонок",
    layer: topologyLayer,
    defaultSettings: {
        topology: {},
    },
    component: TopologyConfig,
};
