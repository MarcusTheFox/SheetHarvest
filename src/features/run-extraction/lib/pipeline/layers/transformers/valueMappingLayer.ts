import { PipelineContext } from "../../core";

/**
 * Слой сопоставления значений по справочнику
 * settings: {
 *   sourceColIndex: number; // Индекс колонки в исходных данных (до проекции)
 *   mapping: Record<string, string>; // Карта "что ищем" -> "на что меняем"
 *   fuzzyMatch: boolean; // Включить ли нечеткий поиск (в будущем)
 * }
 */
export const valueMappingLayer = (context: PipelineContext): PipelineContext => {
    const { rows, settings } = context;

    if (!settings || !settings.mapping || settings.sourceColIndex === undefined) {
        return context;
    }

    const sourceIdx = settings.sourceColIndex;
    const mapping = settings.mapping as Record<string, string>;
    const keys = Object.keys(mapping);

    const newRows = rows.map(row => {
        const originalValue = String(row.cells[sourceIdx] || '').trim();

        if (!originalValue) return row;

        // Ищем прямое совпадение (пока без fuzzy)
        // Приводим к нижнему регистру для базовой нормализации
        const matchedKey = keys.find(key =>
            key.toLowerCase() === originalValue.toLowerCase()
        );

        if (matchedKey) {
            const newCells = [...row.cells];
            newCells[sourceIdx] = mapping[matchedKey];
            return {
                ...row,
                cells: newCells
            };
        }

        return row;
    });

    return {
        ...context,
        rows: newRows
    };
};
