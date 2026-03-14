import { PipelineContext, PipelineRow } from "../../core";
import { getActiveColIndices } from "../../../extraction-utils";
import { LayerMetadata } from "../../types";

export const projectionLayerMetadata: LayerMetadata = {
    id: 'projection',
    name: 'Проекция колонок',
    description: 'Оставляет только выбранные колонки и формирует заголовки',
    isSystem: true,
    layer: projectionLayer,
}

export function projectionLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;

    // Получаем индексы колонок, которые должны остаться (активные)
    const activeColIndices = getActiveColIndices({
        allRows: params.allRows,
        headerRowIndex: params.headerRowIndex,
        tableHeaderRow: params.tableHeaderRow,
        hiddenColumns: params.hiddenColumns,
        selectedColumns: params.selectedColumns,
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
    const projectedRows = rows.map((row): PipelineRow => ({
        originalIndex: row.originalIndex,
        cells: activeColIndices.map(idx => row.cells[idx]),
        groupIndex: row.groupIndex
    }));

    return {
        ...context,
        rows: projectedRows,
        headers: headers
    };
};