import { PipelineContext } from "../../lib/pipeline/core";
import { RegexExtractionLayerSettings } from "./types";

/**
 * Слой извлечения данных по регулярному выражению
 * settings: {
 *   sourceColIndex: number;
 *   pattern: string;       // Например: "[A-Z]{2}-\d{3}"
 *   keepOriginalIfNoMatch: boolean;
 * }
 */
export function regexExtractLayer(context: PipelineContext<RegexExtractionLayerSettings>): PipelineContext {
    const { rows, settings } = context;

    if (!settings || !settings.pattern || settings.sourceColIndex === undefined) {
        return context;
    }

    const sourceIdx = settings.sourceColIndex;
    let regex: RegExp;

    try {
        regex = new RegExp(settings.pattern);
    } catch (e) {
        console.error("Invalid Regex in pipeline:", e);
        return context;
    }

    const newRows = rows.map(row => {
        const originalValue = String(row.cells[sourceIdx] || '').trim();
        if (!originalValue) return row;

        const match = originalValue.match(regex);
        
        const newCells = [...row.cells];
        // Если нашли — берем первую группу (match[0]), если нет — решаем по настройке
        if (match) {
            newCells[sourceIdx] = match[0];
        } else if (!settings.keepOriginalIfNoMatch) {
            newCells[sourceIdx] = "";
        }

        return { ...row, cells: newCells };
    });

    return { ...context, rows: newRows };
};