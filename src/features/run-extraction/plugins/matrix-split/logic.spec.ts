import { matrixSplitLayer } from './logic';
import { createMockTable, getRowValues } from '../../lib/pipeline/test-utils';
import { PipelineContext } from '../../lib/pipeline/core';
import { MatrixSplitLayerSettings } from './types';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["Товар", "Цена", "СМ1", "СМ2", "СМ3"],
    tables: [
        createMockTable("1", "Исходная матрица", [
            ["Товар 1", "100", "15", "20", "12"],
            ["Товар 2", "200", "5", "8", "10"],
        ]),
    ]
};

describe('matrixSplitLayer', () => {
    it('должен превратить 1 таблицу с 3 колонками сетки в 3 отдельные таблицы', () => {
        const settings: MatrixSplitLayerSettings = {
            fixedColIndices: [0, 1],
            gridColIndices: [2, 3, 4],
            valueColumnName: "Количество"
        };

        const result = matrixSplitLayer(MOCK_CONTEXT, settings);

        expect(result.headers).toEqual(["Товар", "Цена", "Количество"]);

        expect(result.tables).toHaveLength(3);

        expect(result.tables[0].id).toEqual("1-0");
        expect(result.tables[0].name).toEqual("СМ1");
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["Товар 1", "100", "15"],
            ["Товар 2", "200", "5"],
        ]);
        
        expect(result.tables[1].id).toEqual("1-1");
        expect(result.tables[1].name).toEqual("СМ2");
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["Товар 1", "100", "20"],
            ["Товар 2", "200", "8"],
        ]);
        
        expect(result.tables[2].id).toEqual("1-2");
        expect(result.tables[2].name).toEqual("СМ3");
        expect(getRowValues(result.tables[2].rows)).toEqual([
            ["Товар 1", "100", "12"],
            ["Товар 2", "200", "10"],
        ]);
    });

    it('должен возвращать оригинал, если колонки сетки не указаны', () => {
        const settings: MatrixSplitLayerSettings = {
            fixedColIndices: [0],
            gridColIndices: [],
            valueColumnName: "Количество"
        };

        const result = matrixSplitLayer(MOCK_CONTEXT, settings);
        expect(result).toBe(MOCK_CONTEXT);
    });
});