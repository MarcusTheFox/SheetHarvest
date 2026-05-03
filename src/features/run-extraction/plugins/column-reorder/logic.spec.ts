import { describe, it, expect } from 'vitest';
import { columnReorderLayer } from './logic';
import { createMockTable, getRowValues } from '../../lib/pipeline/test-utils';
import { PipelineContext } from '../../lib/pipeline/core';
import { ColumnReorderLayerSettings } from './types';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["ID", "Название", "Цена", "Склад"],
    tables: [
        createMockTable("1", "Table 1", [
            ["1", "Яблоки", "100", "Склад А"],
            ["2", "Виноград", "200", "Склад Б"],
        ]),
        createMockTable("2", "Table 2", [
            ["1", "Хлеб", "50", "Склад А"],
        ]),
    ]
};

describe('columnReorderLayer', () => {
    it('должен поменять местами колонки согласно полному списку индексов', () => {
        const settings: ColumnReorderLayerSettings = {
            order: [2, 1, 0, 3]
        };

        const result = columnReorderLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["Цена", "Название", "ID", "Склад"]);

        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["100", "Яблоки", "1", "Склад А"],
            ["200", "Виноград", "2", "Склад Б"],
        ]);

        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["50", "Хлеб", "1", "Склад А"],
        ]);
    });

    it('должен переместить выбранные колонки вперед, а остальные оставить в конце', () => {
        const settings: ColumnReorderLayerSettings = {
            order: [2]
        };

        const result = columnReorderLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["Цена", "ID", "Название", "Склад"]);

        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["100", "1", "Яблоки", "Склад А"],
            ["200", "2", "Виноград", "Склад Б"],
        ]);

        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["50", "1", "Хлеб", "Склад А"],
        ]);
    });

    it('должен игнорировать некорректные индексы (out of bounds)', () => {
        const settings: ColumnReorderLayerSettings = {
            order: [2, 99, -1, 1]
        };

        const result = columnReorderLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["Цена", "Название", "ID", "Склад"]);

        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["100", "Яблоки", "1", "Склад А"],
            ["200", "Виноград", "2", "Склад Б"],
        ]);

        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["50", "Хлеб", "1", "Склад А"],
        ]);
    });

    it('должен возвращать оригинал, если настройки пустые или невалидные', () => {
        const settingsEmpty: ColumnReorderLayerSettings = { order: [] };
        expect(columnReorderLayer(MOCK_CONTEXT, settingsEmpty)).toBe(MOCK_CONTEXT);

        const settingsInvalid: ColumnReorderLayerSettings = { order: [999] };
        expect(columnReorderLayer(MOCK_CONTEXT, settingsInvalid)).toBe(MOCK_CONTEXT);
    });

    it('должен устанавливать флаг модификации структуры колонок', () => {
        const result = columnReorderLayer(MOCK_CONTEXT, { order: [1, 0] });
        expect(result.isColumnStructureModified).toBe(true);
    });
});