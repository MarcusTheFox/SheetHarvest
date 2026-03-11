import { ExtractionLayer } from "../../core";

/**
 * ПРИМЕР СЛОЯ-ТРАНСФОРМАТОРА
 * Разбивает столбец с заголовком "Артикул, Штрихкод" на два: "Артикул" и "Штрихкод"
 */
export const splitColumnExampleLayer: ExtractionLayer = (context) => {
    const { rows, headers } = context;

    // Ищем индекс целевой колонки
    // Примечание: Мы ищем колонку ПОСЛЕ того, как отработал projectionLayer
    const targetColIdx = headers.findIndex(h => h.trim().toLowerCase() === "артикул, штрихкод");

    if (targetColIdx === -1) {
        return context; // Если колонки нет, ничего не делаем
    }

    // 1. Изменяем заголовки: заменяем старый заголовок на два новых
    const newHeaders = [...headers];
    newHeaders.splice(targetColIdx, 1, "Артикул", "Штрихкод");

    // 2. Модифицируем данные внутри всех строк
    const transformedRows = rows.map(r => {
        const newCells = [...r.cells];
        const cellValue = newCells[targetColIdx]?.toString() || "";

        // Разделитель — запятая
        const parts = cellValue.split(',').map((s: string) => s.trim());
        const part1 = parts[0] || "";
        const part2 = parts[1] || "";

        // Заменяем старую ячейку на две новые
        newCells.splice(targetColIdx, 1, part1, part2);

        return { ...r, cells: newCells };
    });

    return {
        ...context,
        headers: newHeaders,
        rows: transformedRows
    };
};
