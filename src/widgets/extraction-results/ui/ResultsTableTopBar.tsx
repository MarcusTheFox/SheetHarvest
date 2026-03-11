"use client";

import { Button } from "@heroui/react";
import { FileJson, X } from "lucide-react";
import { memo } from "react";

interface ResultsTableTopBarProps {
  resultsCount: number;
  onClear: () => void;
}

export const ResultsTableTopBar = memo(({ resultsCount, onClear }: ResultsTableTopBarProps) => {
  return (
    <div className="flex justify-between items-center mb-8 px-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-default-800">Результаты извлечения</h2>
        <p className="text-sm text-default-500">
          Найдено <span className="text-success font-bold">{resultsCount}</span> строк
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="flat" color="primary" className="font-semibold" startContent={<FileJson size={18}/>}>
          JSON
        </Button>
        <Button variant="light" color="danger" className="font-semibold" onPress={onClear} startContent={<X size={18}/>}>
          Закрыть
        </Button>
      </div>
    </div>
  );
});

ResultsTableTopBar.displayName = "ResultsTableTopBar";
