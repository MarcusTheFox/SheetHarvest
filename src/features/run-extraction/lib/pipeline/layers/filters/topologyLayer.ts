import { PipelineContext } from "../../core";
import { checkTopology } from "../../../extraction-utils";
import { LayerMetadata } from "../../types";

export const topologyLayerMetadata: LayerMetadata = {
    id: 'topology',
    name: 'Топология строк',
    description: 'Фильтрует строки по правилам заполненности колонок',
    isSystem: true,
    layer: topologyLayer,
}

export function topologyLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkTopology(r.cells, params.topology))
    };
};