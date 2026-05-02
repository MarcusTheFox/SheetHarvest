import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { PipelineTable } from "./pipeline/core";
import { useMemo } from "react";

export const useExtractionSource = (): PipelineTable[] => {
  const sheets = useSpreadsheetStore(s => s.sheets);

  const tables = useMemo(() => {
    return sheets.map((sheet, idx) => ({
      id: `${idx}`,
      name: sheet.name,
      merges: structuredClone(sheet.merges),
      rows: sheet.data.map((row, rowIdx) => ({
        groupIndex: idx,
        originalIndex: rowIdx,
        cells: structuredClone(row),
      })),
    } as PipelineTable))
  }, [sheets]);

  return tables;
};