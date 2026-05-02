import { ExtractionParams, PipelineContext, PipelineRow } from "./pipeline/core";

export const createInitialContext = (params: ExtractionParams): PipelineContext => {
    const rows = params.tables.map(table =>
        table.rows.map((row, idx) => ({
            originalIndex: idx,
            cells: structuredClone(row.cells),
            groupIndex: 0,
        } as PipelineRow))
    ).flat();

    const maxCols = rows.reduce((max, row) => Math.max(max, row.cells.length), 0);

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