import { ExtractionLayer } from "../../core";
import { checkTopology } from "../../../extraction-utils";

export const topologyLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkTopology(r.cells, params.topology))
    };
};
