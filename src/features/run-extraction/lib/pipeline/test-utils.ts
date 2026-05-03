import { MergeRange, RowValue } from "@/shared/types/spreadsheet";
import { PipelineRow, PipelineTable } from "./core";

export function createMockTable(
    id: string,
    name: string,
    rows: RowValue[],
    merges?: MergeRange[]
): PipelineTable {
    return {
        id,
        name,
        rows: rows.map((row, idx): PipelineRow => ({
            originalIndex: idx,
            cells: [...row],
        })),
        merges,
    }
}

export function getRowValues(rows: PipelineRow[]): RowValue[] {
    return rows.map(row => row.cells);
}