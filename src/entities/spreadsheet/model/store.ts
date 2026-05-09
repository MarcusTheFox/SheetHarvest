import { create } from "zustand";
import { Sheet } from "@/shared/types/spreadsheet";
import { PipelineTable } from "@/features/run-extraction/lib/pipeline/core";

export interface SpreadsheetState {
    file: File | undefined;
    sheets: Sheet[];
    sourceTables: PipelineTable[];
    setSheets: ( sheets: Sheet[]) => void;
    setFile: ( file: File ) => void;
    reset: () => void;
}

export const useSpreadsheetStore = create<SpreadsheetState>(( set, get ) => ({
    file: undefined,
    sheets: [],
    sourceTables: [],

    setFile: ( file: File ) => set({ file }),

    setSheets: ( sheets ) => {
        const sourceTables = sheets.map(( sheet, idx ) => ({
            id: `${ idx }`,
            name: sheet.name,
            merges: sheet.merges,
            rows: sheet.data.map(( row, rowIdx ) => ({
                groupIndex: idx,
                originalIndex: rowIdx,
                cells: [ ...row ],
            })),
        })) as PipelineTable[];

        set({ sheets, sourceTables });
    },

    reset: () => set({ sheets: [] }),
}));
