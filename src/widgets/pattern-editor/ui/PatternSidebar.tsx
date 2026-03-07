"use client";

import { Card, CardBody, Divider, Select, SelectItem, Button, Input, Tooltip, Switch } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { Settings2, Trash2, Eye, EyeOff, Type } from "lucide-react";

const CONSTRAINT_TYPES = [
  { label: "Любое", value: "any" },
  { label: "Не пустое", value: "not_empty" },
  { label: "Число", value: "is_number" },
  { label: "Дата", value: "is_date" },
];

export const PatternSidebar = () => {
  const { 
    headerRowIndex, isManualMode, customNames, constraints, hiddenColumns,
    setConstraintType, toggleVisibility, updateColumnName, toggleManualMode, resetPattern 
  } = usePatternStore();
  
  const { sheets, currentSheetIndex } = useSpreadsheetStore();

  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const maxCols = Math.max(...currentSheet.data.map(r => r.length));
  const headerRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : Array(maxCols).fill("");
  const merges = currentSheet.merges || [];

  // Если заголовок не выбран и не включен ручной режим - просим выбрать
  if (headerRowIndex === null && !isManualMode) {
    return (
      <Card className="w-80 h-fit shrink-0 p-4 border-none shadow-xl">
        <CardBody className="gap-4 items-center text-center">
          <Settings2 size={40} className="text-default-300" />
          <p className="text-sm text-default-500">Выберите строку заголовка в таблице или включите ручной режим</p>
          <Button color="primary" variant="flat" onPress={() => toggleManualMode(maxCols)}>
            Использовать стандартный заголовок
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-80 h-[85vh] shrink-0 sticky top-24 border-none shadow-2xl">
      <CardBody className="gap-4 overflow-y-auto p-5">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 font-bold text-lg"><Settings2 size={20} className="text-primary" /> Настройка</h3>
          <Button isIconOnly variant="light" color="danger" size="sm" onPress={resetPattern}><Trash2 size={18} /></Button>
        </div>

        <div className="flex items-center justify-between bg-default-50 p-2 rounded-xl border border-default-100">
          <span className="text-xs font-semibold px-1">Ручной заголовок</span>
          <Switch size="sm" isSelected={isManualMode} onValueChange={() => toggleManualMode(maxCols)} />
        </div>
        
        <Divider />
        
        <div className="flex flex-col gap-4">
          {headerRow.map((cell, idx) => {
            if (headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges)) return null;

            const isHidden = hiddenColumns.includes(idx);
            const currentName = customNames[idx] || cell?.toString() || "";
            
            // Если в режиме таблицы ячейка пустая и не переименована - игнорируем (скрываем из настроек)
            if (!isManualMode && !cell && !customNames[idx]) return null;

            return (
              <div key={idx} className={`flex flex-col gap-2 p-3 border rounded-2xl transition-all ${isHidden ? "bg-default-100 opacity-60" : "bg-default-50 border-default-200"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-100 text-primary rounded font-mono">COL {String.fromCharCode(65 + idx)}</span>
                  <Button isIconOnly size="sm" variant="light" onPress={() => toggleVisibility(idx)}>
                    {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                
                <Input 
                  size="sm" 
                  variant="underlined"
                  value={currentName}
                  placeholder="Имя колонки..."
                  startContent={<Type size={14} className="text-default-400" />}
                  onValueChange={(val) => updateColumnName(idx, val)}
                  className="mb-1"
                />
                
                <Select 
                  size="sm" 
                  variant="bordered"
                  selectedKeys={[constraints.find(c => c.colIndex === idx)?.type || "any"]}
                  onChange={(e) => setConstraintType(idx, currentName, e.target.value as any)}
                  classNames={{ trigger: "bg-white border-none shadow-sm" }}
                >
                  {CONSTRAINT_TYPES.map((type) => <SelectItem key={type.value}>{type.label}</SelectItem>)}
                </Select>
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-4"><RunExtractionButton /></div>
      </CardBody>
    </Card>
  );
};