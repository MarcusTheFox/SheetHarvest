import { ExtractionParams, PipelineContext } from "./pipeline/core";

export const createInitialContext = (params: ExtractionParams): PipelineContext => {
    const rows = params.allRows.map((cells, idx) => ({
        originalIndex: idx,
        cells,
        groupIndex: 0,
    }));

    const maxCols = params.allRows.reduce((max, row) => Math.max(max, row.length), 0);

    const headers = Array.from({ length: maxCols }, (_, i) => {
        return `${(i + 1)}`;
    });

    return {
        rows,
        headers,
        params,
        isColumnStructureModified: false,
    };
};