import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { ExtractionParams } from "./pipeline/core";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";

export const useExtractionParams = (): ExtractionParams | null => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore(
    useShallow(s => ({
      sheets: s.sheets,
      currentSheetIndex: s.currentSheetIndex,
    }))
  );

  const pipeline = usePatternStore(s => s.pipeline);

  const currentSheet = useMemo(() => {
    return sheets[currentSheetIndex];
  }, [sheets, currentSheetIndex]);
  
  if (!currentSheet) return null;

  return {
    allRows: currentSheet.data,
    merges: currentSheet.merges || [],
    pipeline,
  };
};