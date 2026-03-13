import { validators } from "@/shared/lib/validators";
import { TopologyMode } from "@/entities/pattern/model/types";
import { MergeRange } from "@/shared/types/spreadsheet";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";

export const checkTopology = (row: any[], topology: Record<number, TopologyMode>): boolean => {
    return Object.entries(topology).every(([colIdx, mode]) => {
        const idx = Number(colIdx);
        const val = row[idx];
        const isNotEmpty = val !== null && val !== undefined && val.toString().trim() !== '';
        if (mode === 'filled') return isNotEmpty;
        if (mode === 'empty') return !isNotEmpty;
        return true;
    });
};

export const checkConstraints = (row: any[], constraints: { colIndex: number; type: keyof typeof validators }[]): boolean => {
    return constraints.every((constraint) => {
        const cellValue = row[constraint.colIndex];

        const isEmpty = cellValue === null || cellValue === undefined || cellValue.toString().trim() === '';

        if (isEmpty && constraint.type !== 'not_empty') {
            return true;
        }

        return validators[constraint.type](cellValue);
    });
};

interface GetActiveColIndicesParams {
    allRows: any[][];
    headerRowIndex: number | null;
    tableHeaderRow: any[];
    hiddenColumns: number[];
    selectedColumns: number[];
    isManualMode: boolean;
    customNames: Record<number, string>;
    merges: MergeRange[];
}

export const getActiveColIndices = (params: GetActiveColIndicesParams): number[] => {
    const { allRows, headerRowIndex, tableHeaderRow, hiddenColumns, selectedColumns, isManualMode, customNames, merges } = params;

    if (allRows.length === 0) return [];

    if (isManualMode) {
        // В ручном режиме — только явно выбранные пользователем колонки, кроме скрытых
        return selectedColumns.filter(idx => !hiddenColumns.includes(idx));
    }

    const maxCols = Math.max(...allRows.map(r => r.length));

    return Array.from({ length: maxCols }, (_, i) => i).filter(idx => {
        const isHidden = hiddenColumns.includes(idx);
        const isSecondary = headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges);
        const hasContent = !!tableHeaderRow[idx] || !!customNames[idx];
        return !isHidden && !isSecondary && hasContent;
    });
};

export const projectRows = (rows: any[][], activeColIndices: number[]): any[][] => {
    return rows.map((row) => activeColIndices.map(idx => row[idx]));
};
