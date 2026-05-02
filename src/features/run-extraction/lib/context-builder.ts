import { PipelineContext, PipelineRow, PipelineTable } from "./pipeline/core";

export const createInitialContext = (tables: PipelineTable[]): PipelineContext => {
    const rows = tables.map(table =>
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
        params: {tables},
        isColumnStructureModified: false,
    };
};