"use client";

import { Button } from "@heroui/react";
import { Play } from "lucide-react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { validators } from "@/shared/lib/validators";

export const RunExtractionButton = () => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const { headerRowIndex, constraints } = usePatternStore();
  const { setResults } = useExtractionStore();

  const handleRun = () => {
    const sheet = sheets[currentSheetIndex];
    if (!sheet || headerRowIndex === null) return;

    // 1. Берем все строки ПОСЛЕ заголовка
    const dataToProcess = sheet.data.slice(headerRowIndex + 1);

    // 2. Фильтруем строки согласно constraints
    const filteredResults = dataToProcess.filter((row) => {
      // Строка подходит, если ВСЕ активные constraints выполняются
      return constraints.every((constraint) => {
        const cellValue = row[constraint.colIndex];
        const validator = validators[constraint.type];
        return validator ? validator(cellValue) : true;
      });
    });

    setResults(filteredResults);
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