import { ExtractionParams, PipelineContext } from "./pipeline/core";

export const createInitialContext = (params: ExtractionParams): PipelineContext => {
    const rows = params.allRows.map((cells, idx) => ({
        originalIndex: idx,
        cells,
        groupIndex: 0,
    }));

    const maxCols = Math.max(...params.allRows.map(r => r.length), 0);

    const headers = Array.from({ length: maxCols }, (_, i) => {
        const customName = params.customNames[i];
        if (customName) return customName;

        const headerRowVal = params.tableHeaderRow[i];
        if (headerRowVal !== undefined && headerRowVal !== null && headerRowVal !== '') {
            return String(headerRowVal);
        }

        return String.fromCharCode(65 + (i % 26)); // Fallback to A, B, C...
    });

    return {
        rows,
        headers,
        params
    };
};