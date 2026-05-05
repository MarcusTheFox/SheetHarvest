import { create } from 'zustand';
import { Sheet } from '@/shared/types/spreadsheet';
import { PipelineTable } from '@/features/run-extraction/lib/pipeline/core';

export interface SpreadsheetState {
  sheets: Sheet[];
  sourceTables: PipelineTable[];
  setSheets: (sheets: Sheet[]) => void;
  reset: () => void;
}

export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  sheets: [],
  sourceTables: [],

  setSheets: (sheets) => {
    const sourceTables = sheets.map((sheet, idx) => ({
        id: `${idx}`,
        name: sheet.name,
        merges: sheet.merges,
        rows: sheet.data.map((row, rowIdx) => ({
            groupIndex: idx,
            originalIndex: rowIdx,
            cells: [...row],
        })),
    })) as PipelineTable[];

    set({ sheets, sourceTables });
  },
  
  reset: () => set({ sheets: [] }),
}));