"use client";

import { Card, CardBody, Divider, Select, SelectItem, Button, Input, Switch, Tab, Tabs } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { Settings2, Trash2, Eye, EyeOff, Type, Layers } from "lucide-react";
import { TopologyMode } from "@/entities/pattern/model/types";

const CONSTRAINT_TYPES = [
  { label: "Любое", value: "any" },
  { label: "Не пустое", value: "not_empty" },
  { label: "Число", value: "is_number" },
  { label: "Дата", value: "is_date" },
];

export const PatternSidebar = () => {
  const { 
    headerRowIndex, isManualMode, customNames, constraints, topology, hiddenColumns,
    setConstraintType, setTopology, toggleVisibility, updateColumnName, toggleManualMode, resetPattern 
  } = usePatternStore();
  
  const { sheets, currentSheetIndex } = useSpreadsheetStore();

  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const maxCols = Math.max(...currentSheet.data.map(r => r.length));
  const headerRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : Array(maxCols).fill("");
  const merges = currentSheet.merges || [];

  if (headerRowIndex === null && !isManualMode) {
    return (
      <Card className="w-80 h-fit shrink-0 p-4 border-none shadow-xl bg-white/50 backdrop-blur-md">
        <CardBody className="gap-4 items-center text-center">
          <Settings2 size={40} className="text-default-300" />
          <p className="text-sm text-default-500">Выберите строку заголовка в таблице или включите ручной режим</p>
          <Button color="primary" variant="flat" onPress={() => toggleManualMode(maxCols)}>
            Ручной режим
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-80 h-[85vh] shrink-0 sticky top-24 border-none shadow-2xl bg-white">
      <CardBody className="gap-4 overflow-y-auto p-5">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 font-bold text-lg text-default-800">
            <Settings2 size={20} className="text-primary" /> Настройка
          </h3>
          <Button isIconOnly variant="light" color="danger" size="sm" onPress={resetPattern}><Trash2 size={18} /></Button>
        </div>

        <div className="flex items-center justify-between bg-default-50 p-2 rounded-2xl border border-default-100">
          <span className="text-xs font-bold px-2 text-default-600 uppercase">Ручной заголовок</span>
          <Switch size="sm" isSelected={isManualMode} onValueChange={() => toggleManualMode(maxCols)} />
        </div>
        
        <Divider className="my-1" />
        
        <div className="flex flex-col gap-5">
          {headerRow.map((cell, idx) => {
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
                  <span className="text-[10px] font-black px-2 py-0.5 bg-primary text-white rounded font-mono">
                    COL {String.fromCharCode(65 + idx)}
                  </span>
                  <Button isIconOnly size="sm" variant="light" onPress={() => toggleVisibility(idx)}>
                    {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                
                <Input 
                  size="sm" 
                  variant="flat"
                  label="Название колонки"
                  value={currentName}
                  onValueChange={(val) => updateColumnName(idx, val)}
                  classNames={{ inputWrapper: "bg-default-50 border-none" }}
                />

                <div className="flex flex-col gap-2 bg-default-50 p-2 rounded-xl">
                    <span className="text-[10px] font-bold text-default-400 uppercase flex items-center gap-1">
                        <Layers size={10} /> Структура (Topology)
                    </span>
                    <Tabs 
                        fullWidth 
                        size="sm" 
                        variant="underlined"
                        selectedKey={currentTopology}
                        onSelectionChange={(key) => setTopology(idx, key as TopologyMode)}
                        classNames={{ tabList: "p-0 gap-0", cursor: "bg-primary" }}
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

        <div className="mt-auto pt-6"><RunExtractionButton /></div>
      </CardBody>
    </Card>
  );
};