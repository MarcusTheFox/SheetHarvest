import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineRow, PipelineTable } from "./core";
import { createMockTable, getRowValues } from "./test-utils";

describe('test-utils', () => {
    it('createMockTable', () => {
        const table = createMockTable("1", "Table 1", [
            ["1", "A-100"],
            ["2"],
        ], [
            { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }
        ]);

        expect(table).toEqual({
            id: "1",
            name: "Table 1",
            rows: [
                {
                    originalIndex: 0,
                    cells: ["1", "A-100"],
                },
                {
                    originalIndex: 1,
                    cells: ["2"],
                }
            ],
            merges: [
                { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }
            ]
        } as PipelineTable)
    });

    it('getRowValues', () => {
        const rows: PipelineRow[] = [
            {
                originalIndex: 0,
                cells: ["foo", "bar"],
            },
            {
                originalIndex: 1,
                cells: ["1", "2", "3"],
            }
        ]

        const result = getRowValues(rows);

        expect(result).toEqual([
            ["foo", "bar"],
            ["1", "2", "3"],
        ] as RowValue[])
    });
});