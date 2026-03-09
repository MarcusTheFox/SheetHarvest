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
  const { headerRowIndex, isManualMode, customNames, constraints, topology, anchor, hiddenColumns } = usePatternStore();
  const { setResults } = useExtractionStore();

  const handleRun = () => {
    const sheet = sheets[currentSheetIndex];
    if (!sheet || (headerRowIndex === null && !isManualMode)) return;

    const allRows = sheet.data;
    const tableHeaderRow = headerRowIndex !== null ? allRows[headerRowIndex] : [];
    const merges = sheet.merges || [];

    // Состояние активности поиска (если нет стартового якоря — мы активны сразу)
    let isSearchActive = !anchor.start;
    const finalFilteredRows: any[][] = [];

    // Главный цикл по строкам таблицы
    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];

      // ПРОВЕРКА СТАРТОВОГО ЯКОРЯ
      if (anchor.start && !isSearchActive) {
        const cellValue = row[anchor.start.colIndex]?.toString();
        if (cellValue === anchor.start.text) {
          isSearchActive = true;
          continue; // Саму строку якоря обычно не берем в данные
        }
      }

      // ПРОВЕРКА КОНЕЧНОГО ЯКОРЯ
      if (anchor.end && isSearchActive) {
        const cellValue = row[anchor.end.colIndex]?.toString();
        if (cellValue === anchor.end.text) {
          isSearchActive = false;
          break; // Прекращаем поиск полностью
        }
      }

      // Если мы в активной фазе поиска
      if (isSearchActive) {
        // Пропускаем заголовок, если мы не в ручном режиме
        if (!isManualMode && i <= (headerRowIndex || -1)) continue;

        // 1. ТОПОЛОГИЯ
        const matchesTopology = Object.entries(topology).every(([colIdx, mode]) => {
          const idx = Number(colIdx);
          const val = row[idx];
          const isNotEmpty = val !== null && val !== undefined && val.toString().trim() !== '';
          if (mode === 'filled') return isNotEmpty;
          if (mode === 'empty') return !isNotEmpty;
          return true;
        });

        if (!matchesTopology) continue;

        // 2. CONSTRAINTS
        const matchesConstraints = constraints.every((constraint) => {
          const cellValue = row[constraint.colIndex];
          return validators[constraint.type](cellValue);
        });

        if (!matchesConstraints) continue;

        finalFilteredRows.push(row);
      }
    }

    // ОПРЕДЕЛЕНИЕ ВИДИМЫХ ИНДЕКСОВ
    const maxCols = Math.max(...allRows.map(r => r.length));
    const activeColIndices = Array.from({length: maxCols}, (_, i) => i).filter(idx => {
      const isHidden = hiddenColumns.includes(idx);
      const isSecondary = headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges);
      if (isManualMode) return !isHidden;
      const hasContent = !!tableHeaderRow[idx] || !!customNames[idx];
      return !isHidden && !isSecondary && hasContent;
    });

    // ПРОЕКЦИЯ
    const projectedResults = finalFilteredRows.map((row) => {
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