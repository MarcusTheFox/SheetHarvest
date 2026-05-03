import { describe, it, expect } from 'vitest';
import { columnRenameLayer } from './logic';
import { createMockTable, getRowValues } from '../../lib/pipeline/test-utils';
import { PipelineContext } from '../../lib/pipeline/core';
import { ColumnRenameLayerSettings } from './types';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["ID", "Old_Name", "Old_Price"],
    tables: [
        createMockTable("1", "Table 1", [
            ["1", "Товар А", "100"],
            ["2", "Товар Б", "200"],
        ]),
        createMockTable("2", "Table 2", [
            ["3", "Товар В", "300"],
        ]),
    ]
};

describe('columnRenameLayer', () => {
    it('должен переименовать выбранные колонки по их индексам', () => {
        const settings: ColumnRenameLayerSettings = {
            renames: {
                1: "Название",
                2: "Цена",
            }
        };

        const result = columnRenameLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["ID", "Название", "Цена"]);

        expect(result.tables).toBe(MOCK_CONTEXT.tables);
        expect(result.isColumnStructureModified).toBe(false);
    });

    it('должен игнорировать пустые строки в переименовании', () => {
        const settings: ColumnRenameLayerSettings = {
            renames: {
                1: "  ",
                2: "",
            }
        };

        const result = columnRenameLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["ID", "Old_Name", "Old_Price"]);
        expect(result).toBe(MOCK_CONTEXT);
    });

    it('должен корректно обрабатывать индексы, которых нет в заголовках', () => {
        const settings: ColumnRenameLayerSettings = {
            renames: {
                99: "Утопия"
            }
        };

        const result = columnRenameLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["ID", "Old_Name", "Old_Price"]);
        expect(result).toBe(MOCK_CONTEXT);
    });

    it('должен возвращать оригинал, если настройки пустые', () => {
        const settings: ColumnRenameLayerSettings = {
            renames: {},
        };

        const result = columnRenameLayer(MOCK_CONTEXT, settings);

        expect(result).toBe(MOCK_CONTEXT);
    });
});