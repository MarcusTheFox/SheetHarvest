import { PipelineContext, PipelineTable, PipelineRow } from "../../lib/pipeline/core";
import { MatrixSplitLayerSettings } from "./types";

export function matrixSplitLayer(context: PipelineContext, settings: MatrixSplitLayerSettings): PipelineContext {
    const { tables, headers } = context;

    if (settings.gridColIndices.length === 0) {
        return context;
    }

    const { fixedColIndices, gridColIndices, valueColumnName } = settings;

    const nextHeaders = [
        ...fixedColIndices.map(idx => headers[idx] || `Col ${idx}`),
        valueColumnName
    ];

    const nextTables: PipelineTable[] = [];

    tables.forEach((originalTable) => {
        gridColIndices.forEach((gridIdx, idx) => {
            const gridName = headers[gridIdx] || `Группа ${gridIdx}`;

            const newRows: PipelineRow[] = originalTable.rows.map((row) => {
                const fixedCells = fixedColIndices.map(idx => row.cells[idx]);
                const valueCell = row.cells[gridIdx];

                return {
                    ...row,
                    cells: [...fixedCells, valueCell]
                };
            });

            nextTables.push({
                id: `${originalTable.id}-${idx}`,
                name: gridName,
                rows: newRows,
            });
        });
    });

    return {
        ...context,
        headers: nextHeaders,
        tables: nextTables,
        isColumnStructureModified: true,
    };
}