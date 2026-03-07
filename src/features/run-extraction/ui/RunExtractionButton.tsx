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
  const { headerRowIndex, isManualMode, customNames, constraints, hiddenColumns } = usePatternStore();
  const { setResults } = useExtractionStore();

  const handleRun = () => {
    const sheet = sheets[currentSheetIndex];
    if (!sheet || (headerRowIndex === null && !isManualMode)) return;

    // Определение диапазона данных
    const dataToProcess = isManualMode ? sheet.data : sheet.data.slice(headerRowIndex! + 1);
    const tableHeaderRow = headerRowIndex !== null ? sheet.data[headerRowIndex] : [];
    const merges = sheet.merges || [];

    // 1. ФИЛЬТРАЦИЯ СТРОК
    const filteredRows = dataToProcess.filter((row) => {
      if (constraints.length === 0) return true;
      return constraints.every((constraint) => {
        const cellValue = row[constraint.colIndex];
        return validators[constraint.type](cellValue);
      });
    });

    // 2. ФОРМИРОВАНИЕ ВИДИМЫХ ИНДЕКСОВ
    // Логика: колонка остается если (не скрыта) И (не вторичная объединения) И (не пустая в заголовке таблицы ИЛИ переименована)
    const maxCols = Math.max(...sheet.data.map(r => r.length));
    const activeColIndices = Array.from({length: maxCols}, (_, i) => i).filter(idx => {
      const isHidden = hiddenColumns.includes(idx);
      const isSecondary = headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges);
      
      if (isManualMode) return !isHidden;
      
      const hasContent = !!tableHeaderRow[idx] || !!customNames[idx];
      return !isHidden && !isSecondary && hasContent;
    });

    // 3. ПРОЕКЦИЯ ДАННЫХ
    const projectedResults = filteredRows.map((row) => {
      return activeColIndices.map(idx => row[idx]);
    });

    setResults(projectedResults);
  };

  return (
    <Button 
      color="success" 
      className="w-full font-bold text-white shadow-xl"
      startContent={<Play size={18} fill="currentColor" />}
      onPress={handleRun}
    >
      Запустить сбор данных
    </Button>
  );
};