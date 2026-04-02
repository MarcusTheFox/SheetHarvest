import { PipelineContext } from "../../core";
import { LayerMetadata } from "../../types";

export interface ColumnSplitLayerSettings {
    sourceColIndex: number;
    mode: 'delimiter' | 'regex';
    delimiter?: string;
    pattern?: string;
    newNames: string[];
}

export const columnSplitLayerMetadata: LayerMetadata<ColumnSplitLayerSettings> = {
    id: 'column-split',
    name: 'Разделение колонки',
    description: 'Разбивает одну колонку на две или более по символу или Regex',
    layer: columnSplitLayer,
    defaultSettings: {
        mode: 'delimiter',
        delimiter: ',',
        newNames: ['Часть 1', 'Часть 2'],
        sourceColIndex: 0
    }
}

/**
 * Слой разделения одной колонки на несколько
 * settings: {
 *   sourceColIndex: number; // Индекс в ТЕКУЩЕМ наборе заголовков
 *   mode: 'delimiter' | 'regex';
 *   delimiter: string;      // Например, "," или " "
 *   pattern: string;        // Например, "(.*?)\s*\((.*)\)" для "Значение (Доп)"
 *   newNames: string[];     // Имена для новых колонок
 * }
 */
export function columnSplitLayer(context: PipelineContext<ColumnSplitLayerSettings>): PipelineContext {
    const { rows, headers, settings } = context;

    if (settings?.sourceColIndex === undefined || headers.length === 0) {
        return context;
    }

    const sourceIdx = settings.sourceColIndex;
    const mode = settings.mode || 'delimiter';
    const newNames = (settings.newNames as string[]) || ['Часть 1', 'Часть 2'];

    // 1. Обновляем заголовки
    const newHeaders = [...headers];
    // Заменяем один старый заголовок на список новых
    newHeaders.splice(sourceIdx, 1, ...newNames);

    // 2. Трансформируем данные в строках
    const transformedRows = rows.map(row => {
        const originalValue = String(row.cells[sourceIdx] || '').trim();
        let parts: string[] = [];

        if (mode === 'delimiter') {
            const delim = settings.delimiter || ',';
            parts = originalValue.split(delim).map(p => p.trim());
        } else if (mode === 'regex') {
            try {
                const regex = new RegExp(settings.pattern || '');
                const match = originalValue.match(regex);
                if (match) {
                    // match[0] - это вся строка, match[1...N] - это группы ()
                    parts = match.slice(1); 
                }
            } catch (e) {
                console.error("Split Regex error:", e);
            }
        }

        // Подгоняем количество частей под количество новых имен
        const splitCells = newNames.map((_, i) => parts[i] || "");

        const newCells = [...row.cells];
        newCells.splice(sourceIdx, 1, ...splitCells);

        return { ...row, cells: newCells };
    });

    return {
        ...context,
        headers: newHeaders,
        rows: transformedRows
    };
};