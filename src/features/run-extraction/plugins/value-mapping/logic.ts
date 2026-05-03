import { PipelineContext, PipelineRow, PipelineTable } from "../../lib/pipeline/core";
import { ValueMappingLayerSettings } from "./types";
import { useMappingStore } from "@/entities/value-mapping/model/store";

/**
 * Слой сопоставления значений по глобальному справочнику
 * settings: {
 *   sourceColIndex: number; // Индекс колонки в исходных данных (до проекции)
 * }
 */
export function valueMappingLayer(context: PipelineContext, settings: ValueMappingLayerSettings): PipelineContext {
    const { tables } = context;

    if (!settings || settings.sourceColIndex === undefined) {
        return context;
    }

    const sourceIdx = settings.sourceColIndex;
    const mapping = useMappingStore.getState().mappings;
    const keys = Object.keys(mapping);

    if (keys.length === 0) {
        return context;
    }

    const processRow = (row: PipelineRow): PipelineRow => {
        const originalValue = String(row.cells[sourceIdx] || '').trim();

        if (!originalValue) return row;

        // Ищем прямое совпадение (без fuzzy)
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
    }

    const processTable = (table: PipelineTable): PipelineTable => {
        const rows = table.rows.map(row => processRow(row));
        return {
            ...table,
            rows,
        }
    }

    const newTables = tables.map(table => processTable(table));

    return {
        ...context,
        tables: newTables,
    };
};