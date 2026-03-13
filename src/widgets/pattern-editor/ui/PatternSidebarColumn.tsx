"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { Button, Input, Select, SelectItem, Tab, Tabs } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { ConstraintType, TopologyMode } from "@/entities/pattern/model/types";
import { memo } from "react";

const CONSTRAINT_TYPES = [
  { label: "Любое", value: "any" },
  { label: "Не пустое", value: "not_empty" },
  { label: "Число", value: "is_number" },
  { label: "Дата", value: "is_date" },
];

interface PatternSidebarColumnProps {
  idx: number;
  cell: string | undefined;
}

export const PatternSidebarColumn = memo(({ idx, cell }: PatternSidebarColumnProps) => {
  const { 
    isManualMode, customNames, topology, constraints, hiddenColumns,
    toggleVisibility, updateColumnName, setTopology, setConstraintType 
  } = usePatternStore();

  const isHidden = hiddenColumns.includes(idx);
  const currentName = customNames[idx] || cell?.toString() || "";
  const currentTopology = topology[idx] || 'any';

  if (!isManualMode && !cell && !customNames[idx]) return null;

  return (
    <div className={`flex flex-col gap-3 p-4 border-2 rounded-2xl transition-all ${
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
        onChange={(e) => setConstraintType(idx, currentName, e.target.value as ConstraintType)}
      >
        {CONSTRAINT_TYPES.map((type) => <SelectItem key={type.value}>{type.label}</SelectItem>)}
      </Select>
    </div>
  );
});

PatternSidebarColumn.displayName = "PatternSidebarColumn";
