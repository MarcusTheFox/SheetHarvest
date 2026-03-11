import { ExtractionLayer } from "../core";
import { checkTopology, checkConstraints } from "../../extraction-utils";

export const anchorLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    const { anchor } = params;

    let isSearchActive = !anchor.start;
    const filteredRows: typeof rows = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Проверка стартового якоря
        if (anchor.start && !isSearchActive) {
            const cellValue = row.cells[anchor.start.colIndex]?.toString();
            if (cellValue === anchor.start.text) {
                isSearchActive = true;
                continue; // Строку со стартовым якорем пропускаем
            }
        }

        // Проверка конечного якоря
        if (anchor.end && isSearchActive) {
            const cellValue = row.cells[anchor.end.colIndex]?.toString();
            if (cellValue === anchor.end.text) {
                isSearchActive = false;
                break; // Завершаем поиск
            }
        }

        if (isSearchActive) {
            filteredRows.push(row);
        }
    }

    return { ...context, rows: filteredRows };
};

export const headerSkipLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    if (params.isManualMode || params.headerRowIndex === null) {
        return context;
    }

    return {
        ...context,
        // Пропускаем строки, индекс которых меньше или равен индексу заголовка
        rows: rows.filter(r => r.originalIndex > params.headerRowIndex!)
    };
};

export const topologyLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkTopology(r.cells, params.topology))
    };
};

export const constraintsLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkConstraints(r.cells, params.constraints))
    };
};
