import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { RegexExtractionLayerSettings } from "./types";

/**
 * Слой извлечения данных по регулярному выражению
 * settings: {
 *   sourceColIndex: number;
 *   pattern: string;       // Например: "[A-Z]{2}-\d{3}"
 *   keepOriginalIfNoMatch: boolean;
 * }
 */
export function regexExtractLayer(context: PipelineContext, settings: RegexExtractionLayerSettings): PipelineContext {
    const { tables } = context;

    if (!settings.pattern || settings.sourceColIndex === undefined) {
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

    const processRow = (row: PipelineRow): PipelineRow => {
        const originalValue = String(row.cells[sourceIdx] || '').trim();
        if (!originalValue) return row;

        const match = originalValue.match(regex);
        const newCells = [...row.cells];

        if (match) {
            newCells[sourceIdx] = match[0];
        } else if (!settings.keepOriginalIfNoMatch) {
            newCells[sourceIdx] = "";
        }

        return {
            ...row,
            cells: newCells
        };
    }

    const processTable = (table: PipelineTable): PipelineTable => {
        const rows = table.rows.map(row => processRow(row));
        return {
            ...table,
            rows,
        }
    }

    const newTables = tables.map(table => processTable(table));

    return { ...context, tables: newTables };
};