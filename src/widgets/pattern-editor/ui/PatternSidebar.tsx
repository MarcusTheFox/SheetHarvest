"use client";

import { Card, CardBody, Divider, Select, SelectItem, Button, Chip } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { Settings2, Trash2, Columns } from "lucide-react";

const CONSTRAINT_TYPES = [
  { label: "Любое значение", value: "any" },
  { label: "Не пустое", value: "not_empty" },
  { label: "Число", value: "is_number" },
  { label: "Дата", value: "is_date" },
];

export const PatternSidebar = () => {
  const { headerRowIndex, constraints, toggleConstraint, resetPattern } = usePatternStore();
  const { sheets, currentSheetIndex } = useSpreadsheetStore();

  const currentSheet = sheets[currentSheetIndex];
  if (headerRowIndex === null || !currentSheet) return null;

  const headerRow = currentSheet.data[headerRowIndex];
  const merges = currentSheet.merges || [];

  return (
    <Card className="w-80 h-[85vh] shrink-0 sticky top-24">
      <CardBody className="gap-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Settings2 size={20} className="text-primary" /> Настройка
          </div>
          <Button isIconOnly variant="light" color="danger" size="sm" onPress={resetPattern}>
            <Trash2 size={18} />
          </Button>
        </div>
        
        <Divider />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-default-500">
            <Columns size={16} /> 
            <span>Правила для колонок:</span>
          </div>
          
          {headerRow?.map((cell, idx) => {
            // КЛЮЧЕВОЙ МОМЕНТ: Пропускаем "пустые" части объединенной ячейки
            if (isSecondaryMergeCell(headerRowIndex, idx, merges)) return null;

            const currentConstraint = constraints.find(c => c.colIndex === idx);

            return (
              <div key={idx} className="flex flex-col gap-2 p-3 border rounded-xl bg-default-50 hover:border-primary-200 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-default-200 rounded text-default-600">
                    COL {String.fromCharCode(65 + idx)}
                  </span>
                  {currentConstraint && currentConstraint.type !== 'any' && (
                    <Chip size="sm" color="primary" variant="dot" className="border-none h-4" />
                  )}
                </div>
                
                <span className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                  {cell?.toString() || <span className="text-default-300 italic">Без названия</span>}
                </span>
                
                <Select 
                  size="sm" 
                  variant="bordered"
                  aria-label="Select data type"
                  selectedKeys={[currentConstraint?.type || "any"]}
                  onChange={(e) => toggleConstraint(idx, cell?.toString() || "", e.target.value as any)}
                  classNames={{
                    trigger: "bg-white",
                  }}
                >
                  {CONSTRAINT_TYPES.map((type) => (
                    <SelectItem key={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-4">
          <RunExtractionButton />
        </div>
      </CardBody>
    </Card>
  );
};