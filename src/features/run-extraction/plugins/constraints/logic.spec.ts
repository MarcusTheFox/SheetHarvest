import { describe, it, expect } from 'vitest';
import { constraintsLayer } from './logic';
import { createMockTable, getRowValues } from '../../lib/pipeline/test-utils';
import { ConstraintsLayerSettings } from './types';
import { PipelineContext } from '../../lib/pipeline/core';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["ID", "Код", "Значение"],
    tables: [
        createMockTable("1", "Table 1", [
            ["1", "A-100", "500"],
            ["2", "", "400"],
            ["3", "C-300", "abc"],
            ["4", "D-400", "100"],
        ]),
        createMockTable("2", "Table 2", [
            ["1", "A-111", "10"],
            ["2", "INVALID", "20a"],
            ["3", null, "30"],
        ]),
    ]
};

describe('constraintsLayer', () => {
    it('должен отфильтровать пустые значения (not_empty) в колонке ID', () => {
        const context: PipelineContext = MOCK_CONTEXT;
        
        const settings: ConstraintsLayerSettings = {
            constraints: [
                { colIndex: 1, type: 'not_empty' }
            ]
        };

        const result = constraintsLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(3);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["3", "C-300", "abc"],
            ["4", "D-400", "100"],
        ]);

        expect(result.tables[1].rows).toHaveLength(2);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "A-111", "10"],
            ["2", "INVALID", "20a"],
        ]);
    });

    it('должен отфильтровать строки, где значение не является числом', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: ConstraintsLayerSettings = {
            constraints: [
                { colIndex: 2, type: 'is_number' }
            ]
        };

        const result = constraintsLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(3);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["2", "", "400"],
            ["4", "D-400", "100"],
        ]);

        expect(result.tables[1].rows).toHaveLength(2);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "A-111", "10"],
            ["3", null, "30"],
        ]);
    });

    it('должен отфильтровать код по регулярному выражению', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: ConstraintsLayerSettings = {
            constraints: [
                {
                    colIndex: 1,
                    type: 'regex',
                    pattern: "^[A-Z]-\\d{3}$"
                }
            ]
        };

        const result = constraintsLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(4);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["2", "", "400"],
            ["3", "C-300", "abc"],
            ["4", "D-400", "100"],
        ]);

        expect(result.tables[1].rows).toHaveLength(2);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "A-111", "10"],
            ["3", null, "30"],
        ]);
    });

    it('должен комбинировать несколько условий (not_empty И is_number)', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: ConstraintsLayerSettings = {
            constraints: [
                { colIndex: 1, type: 'not_empty' },
                { colIndex: 2, type: 'is_number' }
            ]
        };

        const result = constraintsLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(2);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["4", "D-400", "100"],
        ]);

        expect(result.tables[1].rows).toHaveLength(1);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "A-111", "10"],
        ]);
    });

    it('должен возвращать исходный контекст, если правила не заданы', () => {
        const result = constraintsLayer(MOCK_CONTEXT, { constraints: [] });
        expect(result).toBe(MOCK_CONTEXT);
    });
});