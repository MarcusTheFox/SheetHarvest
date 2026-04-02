import { ExtractionParams, PipelineContext } from "./pipeline/core";

export const createInitialContext = (params: ExtractionParams): PipelineContext => {
    return {
        rows: params.allRows.map((cells, idx) => ({
            originalIndex: idx,
            cells,
            groupIndex: 0,
        })),
        headers: [],
        params
    };
};