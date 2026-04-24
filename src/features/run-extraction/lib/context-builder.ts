import { ExtractionParams, PipelineContext } from "./pipeline/core";

export const createInitialContext = (params: ExtractionParams): PipelineContext => {
    const rows = params.allRows.map((cells, idx) => ({
        originalIndex: idx,
        cells,
        groupIndex: 0,
    }));

    const maxCols = params.allRows.reduce((max, row) => Math.max(max, row.length), 0);

    const headers = Array.from({ length: maxCols }, (_, i) => {
        const customName = params.customNames[i];
        if (customName) return customName;

        const headerRowVal = params.tableHeaderRow[i];
        if (headerRowVal !== undefined && headerRowVal !== null && headerRowVal !== '') {
            return String(headerRowVal);
        }

        return (i + 1).toString(); // Fallback to 1, 2, 3...
    });

    return {
        rows,
        headers,
        params,
        isColumnStructureModified: false,
    };
};