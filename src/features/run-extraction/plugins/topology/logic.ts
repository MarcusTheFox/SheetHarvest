import { checkTopology } from "../../lib/extraction-utils";
import { PipelineContext } from "../../lib/pipeline/core";

export function topologyLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkTopology(r.cells, params.topology))
    };
};