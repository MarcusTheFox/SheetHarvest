import { ExtractionLayer } from "../../core";
import { getActiveColIndices } from "../../../extraction-utils";

export const projectionLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;

    // Получаем индексы колонок, которые должны остаться (активные)
    const activeColIndices = getActiveColIndices({
        allRows: params.allRows,
        headerRowIndex: params.headerRowIndex,
        tableHeaderRow: params.tableHeaderRow,
        hiddenColumns: params.hiddenColumns,
        isManualMode: params.isManualMode,
        customNames: params.customNames,
        merges: params.merges
    });

    // Формируем новые заголовки для оставшихся столбцов
    const headers = activeColIndices.map(idx => {
        return params.customNames[idx] ||
            params.tableHeaderRow[idx]?.toString() ||
            String.fromCharCode(65 + idx);
    });

    // Оставляем в строках только данные из активных столбцов
    const projectedRows = rows.map(r => ({
        originalIndex: r.originalIndex,
        cells: activeColIndices.map(idx => r.cells[idx])
    }));

    return {
        ...context,
        rows: projectedRows,
        headers: headers
    };
};
