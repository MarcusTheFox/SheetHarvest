import { ExtractionLayer } from "../../core";
import { checkConstraints } from "../../../extraction-utils";

export const constraintsLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkConstraints(r.cells, params.constraints))
    };
};
