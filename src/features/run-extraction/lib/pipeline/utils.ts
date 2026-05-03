import { PipelineTable } from "./core";

export function createHeadersFromTables(tables: PipelineTable[]): string[] {
    const rows = tables.map(table => table.rows).flat();
    const maxCols = rows.reduce((max, row) => Math.max(max, row.cells.length), 0);
    const headers = Array.from({ length: maxCols }, (_, i) => `${(i + 1)}`);

    return headers;
}