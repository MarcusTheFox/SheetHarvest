"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { Button, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { memo } from "react";

interface PatternSidebarColumnProps {
  idx: number;
  cell: string | undefined;
}

export const PatternSidebarColumn = memo(({ idx, cell }: PatternSidebarColumnProps) => {
  const isHidden = usePatternStore(s => s.hiddenColumns.includes(idx));
  const isManualMode = usePatternStore(s => s.isManualMode);
  const currentName = usePatternStore(s => s.customNames[idx] || cell?.toString() || "");

  const updateColumnName = usePatternStore(s => s.updateColumnName);
  const toggleVisibility = usePatternStore(s => s.toggleVisibility);

  if (!isManualMode && !cell && !currentName) return null;

  return (
    <div className={`flex flex-col gap-3 p-4 border-2 rounded-2xl transition-all ${
      isHidden ? "bg-default-50 border-transparent opacity-50" : "bg-white border-default-100 shadow-sm"
    }`}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black px-2 py-0.5 bg-primary text-white rounded font-mono uppercase">
          COL {String.fromCharCode(65 + idx)}
        </span>
        <div className="flex gap-1">
          <Button isIconOnly size="sm" variant="light" onPress={() => toggleVisibility(idx)}>
            {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>
      
      <Input 
        size="sm" 
        variant="flat"
        label="Имя в результате"
        value={currentName}
        onValueChange={(val) => updateColumnName(idx, val)}
      />
    </div>
  );
});

PatternSidebarColumn.displayName = "PatternSidebarColumn";
