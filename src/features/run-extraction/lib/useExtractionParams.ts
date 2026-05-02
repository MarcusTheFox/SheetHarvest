import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { ExtractionParams, PipelineTable } from "./pipeline/core";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";

export const useExtractionParams = (): ExtractionParams | undefined => {
  const { sheets } = useSpreadsheetStore(
    useShallow(s => ({
      sheets: s.sheets,
      currentSheetIndex: s.currentSheetIndex,
    }))
  );

  const tables = useMemo(() => {
    return sheets.map((sheet, idx) => ({
      id: idx,
      name: sheet.name,
      merges: structuredClone(sheet.merges),
      rows: sheet.data.map((row, rowIdx) => ({
        groupIndex: idx,
        originalIndex: rowIdx,
        cells: structuredClone(row),
      })),
    } as PipelineTable))
  }, [sheets]);

  if (tables.length === 0) return;

  return {
    tables,
  };
};