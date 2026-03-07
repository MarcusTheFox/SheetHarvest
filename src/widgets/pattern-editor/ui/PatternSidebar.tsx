"use client";

import { Card, CardBody, Divider, Select, SelectItem, Button, Chip, Tooltip } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { Settings2, Trash2, Columns, Eye, EyeOff } from "lucide-react";

const CONSTRAINT_TYPES = [
  { label: "Любое значение", value: "any" },
  { label: "Не пустое", value: "not_empty" },
  { label: "Число", value: "is_number" },
  { label: "Дата", value: "is_date" },
];

export const PatternSidebar = () => {
  const { 
    headerRowIndex, 
    constraints, 
    hiddenColumns, 
    setConstraintType, 
    toggleVisibility, 
    resetPattern 
  } = usePatternStore();
  
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
            if (isSecondaryMergeCell(headerRowIndex, idx, merges)) return null;

            const currentConstraint = constraints.find(c => c.colIndex === idx);
            const isHidden = hiddenColumns.includes(idx);

            return (
              <div 
                key={idx} 
                className={`flex flex-col gap-2 p-3 border rounded-xl transition-all ${
                  isHidden ? "bg-default-100 opacity-60" : "bg-default-50 border-default-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-default-200 rounded text-default-600 font-mono">
                    COL {String.fromCharCode(65 + idx)}
                  </span>
                  
                  <Tooltip content={isHidden ? "Показать в результате" : "Скрыть из результата"}>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light" 
                      color={isHidden ? "default" : "primary"}
                      onPress={() => toggleVisibility(idx)}
                    >
                      {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </Tooltip>
                </div>
                
                <span className="font-semibold text-sm line-clamp-1">
                  {cell?.toString() || <span className="text-default-300 italic">Без названия</span>}
                </span>
                
                <Select 
                  size="sm" 
                  variant="bordered"
                  labelPlacement="outside"
                  selectedKeys={[currentConstraint?.type || "any"]}
                  onChange={(e) => setConstraintType(idx, cell?.toString() || "", e.target.value as any)}
                  classNames={{ trigger: "bg-white" }}
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