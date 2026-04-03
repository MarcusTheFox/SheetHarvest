import { MergeRange, TableValue, RowValue } from "@/shared/types/spreadsheet";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";

interface GetActiveColIndicesParams {
    allRows: TableValue;
    headerRowIndex: number | null;
    tableHeaderRow: RowValue;
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
