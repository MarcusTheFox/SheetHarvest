import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { ExtractionParams } from "./pipeline/core";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";

export const useExtractionParams = (): ExtractionParams | null => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const pattern = usePatternStore(
    useShallow(s => ({
      headerRowIndex: s.headerRowIndex,
      isManualMode: s.isManualMode,
      selectedColumns: s.selectedColumns,
      customNames: s.customNames,
      hiddenColumns: s.hiddenColumns,
      pipeline: s.pipeline,
    }))
  );
  
  const currentSheet = useMemo(() => {
    return sheets[currentSheetIndex];
  }, [sheets, currentSheetIndex]);
  
  if (!currentSheet) return null;

  const tableHeaderRow = pattern.headerRowIndex !== null ? currentSheet.data[pattern.headerRowIndex] : [];

  return {
      allRows: currentSheet.data,
      tableHeaderRow,
      merges: currentSheet.merges || [],
      ...pattern,
  };
};