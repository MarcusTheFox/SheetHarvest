import { regexExtractLayer } from './logic';
import { PipelineContext } from '../../lib/pipeline/core';
import { createMockTable, getRowValues } from '../../lib/pipeline/test-utils';
import { RegexExtractionLayerSettings } from './types';

const MOCK_CONTEXT: PipelineContext = {
    isColumnStructureModified: false,
    headers: ["ID", "Код", "Значение"],
    tables: [
        createMockTable("1", "Table 1", [
            ["1", "A-100", "500"],
            ["2", "B-200*", "400"],
            ["3", "C-300 (info)", "300"],
        ]),
        createMockTable("2", "Table 2", [
            ["1", "A-111", "10"],
            ["2", "BB-222", "20"],
            ["3", "Music C418", "30"],
        ]),
    ]
}

describe('regexExtractLayer', () => {
    it('должен извлечь код из строки (A-111) и оставить несовпадения', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: RegexExtractionLayerSettings = {
            sourceColIndex: 1,
            pattern: "[A-Z]-\\d{3}",
            keepOriginalIfNoMatch: true,
        }

        const result = regexExtractLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(3);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["2", "B-200", "400"],
            ["3", "C-300", "300"],
        ]);

        expect(result.tables[1].rows).toHaveLength(3);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "A-111", "10"],
            ["2", "B-222", "20"],
            ["3", "Music C418", "30"],
        ]);
    });

    it('должен очищать ячейку, если совпадение не найдено', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: RegexExtractionLayerSettings = {
            sourceColIndex: 1,
            pattern: "[A-Z]-\\d{3}",
            keepOriginalIfNoMatch: false,
        }

        const result = regexExtractLayer(context, settings);

        expect(result.tables[0].rows).toHaveLength(3);
        expect(getRowValues(result.tables[0].rows)).toEqual([
            ["1", "A-100", "500"],
            ["2", "B-200", "400"],
            ["3", "C-300", "300"],
        ]);

        expect(result.tables[1].rows).toHaveLength(3);
        expect(getRowValues(result.tables[1].rows)).toEqual([
            ["1", "A-111", "10"],
            ["2", "B-222", "20"],
            ["3", "", "30"],
        ]);
    });

    it('должен возвращать контекст без изменений при некорректном Regex', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings: RegexExtractionLayerSettings = {
            sourceColIndex: 1,
            pattern: "[",
            keepOriginalIfNoMatch: true,
        }

        const result = regexExtractLayer(context, settings);

        expect(result).toBe(context);
    });

    it('должен возвращать контекст без изменений, если настройки неполные', () => {
        const context: PipelineContext = MOCK_CONTEXT;

        const settings_1: RegexExtractionLayerSettings = {
            sourceColIndex: 0,
            pattern: "",
            keepOriginalIfNoMatch: false,
        }

        const settings_2: RegexExtractionLayerSettings = {
            pattern: "[A-Z]-\\d{3}",
            keepOriginalIfNoMatch: false,
        }

        const result_1 = regexExtractLayer(context, settings_1)
        const result_2 = regexExtractLayer(context, settings_2)

        expect(result_1).toBe(context);
        expect(result_2).toBe(context);
    });
});