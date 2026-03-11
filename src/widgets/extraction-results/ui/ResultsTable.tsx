"use client";

import { Card } from "@heroui/react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { ResultsTableTopBar } from "./ResultsTableTopBar";
import { ResultsTableData } from "./ResultsTableData";

export const ResultsTable = () => {
  const { results, clearResults } = useExtractionStore();
  const { headerRowIndex, isManualMode, customNames, hiddenColumns } = usePatternStore();
  const { sheets, currentSheetIndex } = useSpreadsheetStore();

  if (results.length === 0 || (!isManualMode && headerRowIndex === null)) return null;

  const currentSheet = sheets[currentSheetIndex];
  const tableHeaderRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : [];
  const merges = currentSheet.merges || [];
  
  const maxCols = Math.max(...currentSheet.data.map(r => r.length));
  const visibleHeaderNames = Array.from({length: maxCols}, (_, i) => i)
    .filter(idx => {
      const isHidden = hiddenColumns.includes(idx);
      const isSecondary = headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges);
      if (isManualMode) return !isHidden;
      const hasContent = !!tableHeaderRow[idx] || !!customNames[idx];
      return !isHidden && !isSecondary && hasContent;
    })
    .map(idx => customNames[idx] || tableHeaderRow[idx]?.toString() || String.fromCharCode(65 + idx));

  return (
    <Card className="w-full p-6 shadow-2xl border-none bg-white">
      <ResultsTableTopBar 
        resultsCount={results.length} 
        onClear={clearResults} 
      />
      <ResultsTableData 
        visibleHeaderNames={visibleHeaderNames} 
        results={results} 
      />
    </Card>
  );
};