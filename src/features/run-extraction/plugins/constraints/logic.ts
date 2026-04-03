import { checkConstraints } from "../../lib/extraction-utils";
import { PipelineContext } from "../../lib/pipeline/core";

export function constraintsLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkConstraints(r.cells, params.constraints))
    };
};
