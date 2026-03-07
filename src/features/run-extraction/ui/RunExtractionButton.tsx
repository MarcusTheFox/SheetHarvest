"use client";

import { Button } from "@heroui/react";
import { Play } from "lucide-react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { validators } from "@/shared/lib/validators";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";

export const RunExtractionButton = () => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const { headerRowIndex, constraints, hiddenColumns } = usePatternStore();
  const { setResults } = useExtractionStore();

  const handleRun = () => {
    const sheet = sheets[currentSheetIndex];
    if (!sheet || headerRowIndex === null) return;

    const dataToProcess = sheet.data.slice(headerRowIndex + 1);
    const headerRow = sheet.data[headerRowIndex];
    const merges = sheet.merges || [];

    // 1. ФИЛЬТРАЦИЯ СТРОК
    const filteredRows = dataToProcess.filter((row) => {
      if (constraints.length === 0) return true;

      return constraints.every((constraint) => {
        const cellValue = row[constraint.colIndex];
        const validator = validators[constraint.type];
        return validator ? validator(cellValue) : true;
      });
    });
    
    const projectedResults = filteredRows.map((row) => {
      return headerRow
        .map((_, idx) => row[idx]) 
        .filter((_, idx) => {
          const isSecondary = isSecondaryMergeCell(headerRowIndex, idx, merges);
          const isHidden = hiddenColumns.includes(idx);
          return !isSecondary && !isHidden;
        });
    });

    setResults(projectedResults);
  };

  return (
    <Button 
      color="success" 
      className="w-full font-bold text-white shadow-lg"
      startContent={<Play size={18} fill="currentColor" />}
      onPress={handleRun}
      isDisabled={headerRowIndex === null}
    >
      Запустить поиск
    </Button>
  );
};