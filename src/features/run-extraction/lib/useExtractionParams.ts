import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { ExtractionParams } from "./pipeline/core";

export const useExtractionParams = (): ExtractionParams | null => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const pattern = usePatternStore();
  
  const sheet = sheets[currentSheetIndex];
  if (!sheet) return null;

  return {
      allRows: sheet.data,
      headerRowIndex: pattern.headerRowIndex,
      tableHeaderRow: pattern.headerRowIndex !== null ? sheet.data[pattern.headerRowIndex] : [],
      isManualMode: pattern.isManualMode,
      selectedColumns: pattern.selectedColumns,
      customNames: pattern.customNames,
      constraints: pattern.constraints,
      topology: pattern.topology,
      anchor: pattern.anchor,
      hiddenColumns: pattern.hiddenColumns,
      pipeline: pattern.pipeline,
      merges: sheet.merges || []
  };
};