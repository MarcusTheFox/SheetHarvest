import { PipelineContext } from "../../core";
import { LayerMetadata } from "../../types";

export interface ValueMappingLayerSettings {
    sourceColIndex: number;
    mapping: Record<string, string>;
    fuzzyMatch: boolean;
}

export const valueMappingLayerMetadata: LayerMetadata<ValueMappingLayerSettings> = {
    id: 'value-mapping',
    name: 'Сопоставление значений',
    description: 'Заменяет значения в колонках по загруженному справочнику',
    layer: valueMappingLayer,
}

/**
 * Слой сопоставления значений по справочнику
 * settings: {
 *   sourceColIndex: number; // Индекс колонки в исходных данных (до проекции)
 *   mapping: Record<string, string>; // Карта "что ищем" -> "на что меняем"
 *   fuzzyMatch: boolean; // Включить ли нечеткий поиск (в будущем)
 * }
 */
export function valueMappingLayer(context: PipelineContext<ValueMappingLayerSettings>): PipelineContext {
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