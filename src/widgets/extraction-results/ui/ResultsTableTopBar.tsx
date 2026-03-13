"use client";

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Download, FileJson, FileSpreadsheet, FileText, X } from "lucide-react";
import { memo } from "react";
import { exportToCSV, exportToExcel, exportToJSON } from "@/features/run-extraction/lib/export-utils";
import { TableValue } from "@/shared/types/spreadsheet";

interface ResultsTableTopBarProps {
  resultsCount: number;
  headers: string[];
  results: TableValue;
  onClear: () => void;
}

export const ResultsTableTopBar = memo(({ resultsCount, headers, results, onClear }: ResultsTableTopBarProps) => {
  return (
    <div className="flex justify-between items-center mb-8 px-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-default-800">Результаты извлечения</h2>
        <p className="text-sm text-default-500">
          Найдено <span className="text-success font-bold">{resultsCount}</span> строк
        </p>
      </div>
      <div className="flex gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              color="primary"
              className="font-semibold shadow-sm"
              startContent={<Download size={18} />}
            >
              Экспорт
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Export options">
            <DropdownItem
              key="excel"
              startContent={<FileSpreadsheet size={18} className="text-success" />}
              onPress={() => exportToExcel(headers, results)}
            >
              Excel (.xlsx)
            </DropdownItem>
            <DropdownItem
              key="csv"
              startContent={<FileText size={18} className="text-primary" />}
              onPress={() => exportToCSV(headers, results)}
            >
              CSV (.csv)
            </DropdownItem>
            <DropdownItem
              key="json"
              startContent={<FileJson size={18} className="text-warning" />}
              onPress={() => exportToJSON(headers, results)}
            >
              JSON (.json)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button
          variant="light"
          color="danger"
          className="font-semibold"
          onPress={onClear}
          startContent={<X size={18} />}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
});

ResultsTableTopBar.displayName = "ResultsTableTopBar";
