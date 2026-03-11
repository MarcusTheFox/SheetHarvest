import { ExtractionLayer } from "../../core";

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
