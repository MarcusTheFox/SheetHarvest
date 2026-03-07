"use client";

import { Card, CardBody, Button, Select, SelectItem, Divider } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { Settings2, Trash2 } from "lucide-react";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";

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
  const headerRow = headerRowIndex !== null ? currentSheet?.data[headerRowIndex] : null;

  if (headerRowIndex === null) return null;

  return (
    <Card className="w-80 h-fit shrink-0">
      <CardBody className="gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Settings2 size={20} /> Паттерн
          </div>
          <Button isIconOnly variant="light" color="danger" onPress={resetPattern}>
            <Trash2 size={18} />
          </Button>
        </div>
        
        <Divider />
        <RunExtractionButton />
        
        <div className="flex flex-col gap-4">
          <p className="text-sm text-default-500">Настройте правила для колонок:</p>
          
          {headerRow?.map((cell, idx) => (
            <div key={idx} className="flex flex-col gap-1 p-2 border rounded-lg bg-default-50">
              <span className="text-xs font-mono text-default-400">Колонка {idx + 1}</span>
              <span className="font-medium truncate mb-2">{cell?.toString() || "(пусто)"}</span>
              
              <Select 
                size="sm" 
                placeholder="Тип данных"
                selectedKeys={[constraints.find(c => c.colIndex === idx)?.type || "any"]}
                onChange={(e) => toggleConstraint(idx, cell?.toString() || "", e.target.value as any)}
              >
                {CONSTRAINT_TYPES.map((type) => (
                  <SelectItem key={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};