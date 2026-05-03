import { describe, it, expect } from 'vitest';
import { topologyLayer } from './logic';
import { PipelineContext, PipelineTable } from '../../lib/pipeline/core';
import { TopologyLayerSettings } from './types';
import { createMockTable, getRowValues } from '../../lib/pipeline/test-utils';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["ID", "Код", "Значение"],
    tables: [
        createMockTable("1", "Table 1", [
            ["1", "A-100", "500"],
            ["2", "", "400"],
            ["3", "C-300", "300"],
            ["4", "D-400", ""],
            ["5", "   ", "   "],
        ]),
        createMockTable("2", "Table 2", [
            ["1", "AA-111", "10"],
            ["2", null, "20"],
            ["3", "CC-333", "30"],
            ["4", "DD-444", undefined],
            ["5"],
        ]),
    ]
}

describe('topologyLayer', () => {
    it('должен фильтровать строки по правилу "filled" (заполнено)', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: TopologyLayerSettings = {
            topology: { 1: 'filled' }
        };

        const result = topologyLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(3);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["3", "C-300", "300"],
            ["4", "D-400", ""],
        ]);

        expect(result.tables[1].rows).toHaveLength(3);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "AA-111", "10"],
            ["3", "CC-333", "30"],
            ["4", "DD-444", undefined],
        ]);
    });

    it('должен фильтровать строки по правилу "empty" (пусто)', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: TopologyLayerSettings = {
            topology: { 2: 'empty' }
        };

        const result = topologyLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(2);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["4", "D-400", ""],
            ["5", "   ", "   "],
        ]);

        expect(result.tables[1].rows).toHaveLength(2);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["4", "DD-444", undefined],
            ["5"],
        ]);
    });

    it('должен комбинировать несколько правил для разных колонок', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: TopologyLayerSettings = {
            topology: {
                1: 'empty',
                2: 'filled',
            }
        };

        const result = topologyLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(1);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["2", "", "400"],
        ]);

        expect(result.tables[1].rows).toHaveLength(1);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["2", null, "20"],
        ]);
    });

    it('должен игнорировать колонки с правилом "any"', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: TopologyLayerSettings = {
            topology: { 1: 'any' }
        };

        const result = topologyLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(5);
        expect(result.tables[1].rows).toHaveLength(5);
    });

    it('должен возвращать исходный контекст, если топология пуста', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const result = topologyLayer(context, {});
        expect(result).toBe(context);
    });
});