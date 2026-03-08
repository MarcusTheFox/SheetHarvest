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
  const { headerRowIndex, isManualMode, customNames, constraints, topology, hiddenColumns } = usePatternStore();
  const { setResults } = useExtractionStore();

  const handleRun = () => {
    const sheet = sheets[currentSheetIndex];
    if (!sheet || (headerRowIndex === null && !isManualMode)) return;

    const dataToProcess = isManualMode ? sheet.data : sheet.data.slice(headerRowIndex! + 1);
    const tableHeaderRow = headerRowIndex !== null ? sheet.data[headerRowIndex] : [];
    const merges = sheet.merges || [];

    // 1. КОМБИНИРОВАННАЯ ФИЛЬТРАЦИЯ
    const filteredRows = dataToProcess.filter((row) => {
      // ПРОВЕРКА 1: ТОПОЛОГИЯ (Структура)
      const matchesTopology = Object.entries(topology).every(([colIdx, mode]) => {
        const idx = Number(colIdx);
        const val = row[idx];
        const isNotEmpty = val !== null && val !== undefined && val.toString().trim() !== '';

        if (mode === 'filled') return isNotEmpty;
        if (mode === 'empty') return !isNotEmpty;
        return true; // any
      });

      if (!matchesTopology) return false;

      // ПРОВЕРКА 2: CONSTRAINTS (Контент)
      if (constraints.length === 0) return true;
      return constraints.every((constraint) => {
        const cellValue = row[constraint.colIndex];
        return validators[constraint.type](cellValue);
      });
    });

    // 2. ОПРЕДЕЛЕНИЕ ВИДИМЫХ ИНДЕКСОВ
    const maxCols = Math.max(...sheet.data.map(r => r.length));
    const activeColIndices = Array.from({length: maxCols}, (_, i) => i).filter(idx => {
      const isHidden = hiddenColumns.includes(idx);
      const isSecondary = headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges);
      if (isManualMode) return !isHidden;
      const hasContent = !!tableHeaderRow[idx] || !!customNames[idx];
      return !isHidden && !isSecondary && hasContent;
    });

    // 3. ПРОЕКЦИЯ
    const projectedResults = filteredRows.map((row) => {
      return activeColIndices.map(idx => row[idx]);
    });

    setResults(projectedResults);
  };

  return (
    <Button 
      color="success" 
      className="w-full font-bold text-white shadow-xl py-6 rounded-2xl"
      startContent={<Play size={20} fill="currentColor" />}
      onPress={handleRun}
    >
      Запустить сбор данных
    </Button>
  );
};