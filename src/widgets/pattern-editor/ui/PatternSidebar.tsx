"use client";

import { Card, CardBody, Divider, Select, SelectItem, Button, Input, Switch, Tab, Tabs, Chip } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { Settings2, Trash2, Eye, EyeOff, Layers, Flag, XCircle, Anchor } from "lucide-react";
import { TopologyMode } from "@/entities/pattern/model/types";

const CONSTRAINT_TYPES = [
  { label: "Любое", value: "any" },
  { label: "Не пустое", value: "not_empty" },
  { label: "Число", value: "is_number" },
  { label: "Дата", value: "is_date" },
];

export const PatternSidebar = () => {
  const { 
    headerRowIndex, isManualMode, customNames, constraints, topology, anchor, hiddenColumns,
    setConstraintType, setTopology, setStartAnchor, setEndAnchor, toggleVisibility, updateColumnName, toggleManualMode, resetPattern 
  } = usePatternStore();
  
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const maxCols = Math.max(...currentSheet.data.map(r => r.length));
  const headerRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : Array(maxCols).fill("");
  const merges = currentSheet.merges || [];

  return (
    <Card className="w-80 h-[85vh] shrink-0 sticky top-24 border-none shadow-2xl bg-white">
      <CardBody className="gap-4 overflow-y-auto p-5">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 font-bold text-lg text-default-800">
            <Settings2 size={20} className="text-primary" /> Паттерн
          </h3>
          <Button isIconOnly variant="light" color="danger" size="sm" onPress={resetPattern}><Trash2 size={18} /></Button>
        </div>

        <div className="flex flex-col gap-2">
           <div className="flex items-center justify-between bg-default-50 p-2 rounded-xl border border-default-100">
             <span className="text-[10px] font-bold px-2 text-default-600 uppercase">Ручной режим</span>
             <Switch size="sm" isSelected={isManualMode} onValueChange={() => toggleManualMode(maxCols)} />
           </div>
        </div>

        {/* Секция ЯКОРЕЙ */}
        <div className="flex flex-col gap-2 p-3 bg-primary-50/50 rounded-2xl border border-primary-100">
            <span className="text-[10px] font-black text-primary-600 uppercase flex items-center gap-1 mb-1">
                <Anchor size={12} /> Область поиска (Якоря)
            </span>
            <div className="flex flex-col gap-2">
                <Chip 
                    onClose={anchor.start ? () => setStartAnchor(null) : undefined} 
                    variant="flat" 
                    color={anchor.start ? "success" : "default"}
                    size="sm"
                    className="max-w-full"
                    startContent={<Flag size={14} />}
                >
                    {anchor.start ? `От: ${anchor.start.text}` : "Начало: не задано"}
                </Chip>
                <Chip 
                    onClose={anchor.end ? () => setEndAnchor(null) : undefined} 
                    variant="flat" 
                    color={anchor.end ? "danger" : "default"}
                    size="sm"
                    className="max-w-full"
                    startContent={<XCircle size={14} />}
                >
                    {anchor.end ? `До: ${anchor.end.text}` : "Конец: не задано"}
                </Chip>
            </div>
        </div>
        
        <Divider />
        
        {/* Список колонок */}
        <div className="flex flex-col gap-4">
          {(headerRowIndex !== null || isManualMode) && headerRow.map((cell, idx) => {
            if (headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges)) return null;

            const isHidden = hiddenColumns.includes(idx);
            const currentName = customNames[idx] || cell?.toString() || "";
            const currentTopology = topology[idx] || 'any';

            if (!isManualMode && !cell && !customNames[idx]) return null;

            return (
              <div key={idx} className={`flex flex-col gap-3 p-4 border-2 rounded-2xl transition-all ${
                isHidden ? "bg-default-50 border-transparent opacity-50" : "bg-white border-default-100 shadow-sm"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black px-2 py-0.5 bg-primary text-white rounded font-mono uppercase">
                    COL {String.fromCharCode(65 + idx)}
                  </span>
                  <Button isIconOnly size="sm" variant="light" onPress={() => toggleVisibility(idx)}>
                    {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                
                <Input 
                  size="sm" 
                  variant="flat"
                  label="Имя в результате"
                  value={currentName}
                  onValueChange={(val) => updateColumnName(idx, val)}
                />

                <div className="flex flex-col gap-1 bg-default-50 p-2 rounded-xl">
                    <span className="text-[9px] font-black text-default-400 uppercase">Структура</span>
                    <Tabs 
                        fullWidth 
                        size="sm" 
                        variant="underlined"
                        selectedKey={currentTopology}
                        onSelectionChange={(key) => setTopology(idx, key as TopologyMode)}
                    >
                        <Tab key="any" title="Любая" />
                        <Tab key="filled" title="Заполнена" />
                        <Tab key="empty" title="Пусто" />
                    </Tabs>
                </div>
                
                <Select 
                  size="sm" 
                  label="Тип данных"
                  variant="bordered"
                  selectedKeys={[constraints.find(c => c.colIndex === idx)?.type || "any"]}
                  onChange={(e) => setConstraintType(idx, currentName, e.target.value as any)}
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