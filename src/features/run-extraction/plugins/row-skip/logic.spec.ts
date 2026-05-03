import { rowSkipLayer } from './logic';
import { PipelineContext } from '../../lib/pipeline/core';
import { createMockTable } from '../../lib/pipeline/test-utils';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["ID", "Код", "Значение"],
    tables: [
        createMockTable("1", "Table 1", [
            ["1", "A-100", "500"],
            ["2", "B-200", "400"],
            ["3", "C-300", "300"],
        ]),
        createMockTable("2", "Table 2", [
            ["1", "AA-111", "10"],
            ["2", "BB-222", "20"],
            ["3", "CC-333", "30"],
            ["4", "DD-444", "40"],
        ]),
    ]
}

describe('rowSkipLayer', () => {
    it('должен пропускать указанное количество строк в каждой таблице', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const result = rowSkipLayer(context, { skipCount: 2 });

        expect(result.tables[0].rows).toHaveLength(1);
        expect(result.tables[0].rows[0].cells).toEqual(["3", "C-300", "300"]);

        expect(result.tables[1].rows).toHaveLength(2);
        expect(result.tables[1].rows[0].cells).toEqual(["3", "CC-333", "30"]);
    });

    it('должен возвращать пустой массив строк, если skipCount больше или равен количеству строк', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const result = rowSkipLayer(context, { skipCount: 4 });

        expect(result.tables[0].rows).toHaveLength(0);
        expect(result.tables[1].rows).toHaveLength(0);
    });

    it('должен возвращать исходный контекст, если skipCount <= 0', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const result = rowSkipLayer(context, { skipCount: 0 });
        const resultNegative = rowSkipLayer(context, { skipCount: -5 });

        expect(result).toBe(context);
        expect(resultNegative).toBe(context);
    });

    it('должен использовать значение по умолчанию (1), если настройки не переданы', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const result = rowSkipLayer(context, {});

        expect(result.tables[0].rows).toHaveLength(2);
        expect(result.tables[0].rows[0].cells).toEqual(["2", "B-200", "400"]);

        expect(result.tables[1].rows).toHaveLength(3);
        expect(result.tables[1].rows[0].cells).toEqual(["2", "BB-222", "20"]);
    });

    it('не должен мутировать оригинальный контекст (иммутабельность)', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const result = rowSkipLayer(context, { skipCount: 1 });

        expect(result).not.toBe(context);
        expect(result.tables[0].rows[0]).toBe(context.tables[0].rows[1]);

        expect(context.tables[0].rows).toHaveLength(3);
        expect(context.tables[0].rows[0].cells).toEqual(["1", "A-100", "500"]);

        expect(context.tables[1].rows).toHaveLength(4);
        expect(context.tables[1].rows[0].cells).toEqual(["1", "AA-111", "10"]);
    });
});