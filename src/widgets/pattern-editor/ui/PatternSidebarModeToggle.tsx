"use client";

import { Switch } from "@heroui/react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { memo } from "react";

interface PatternSidebarModeToggleProps {
  maxCols: number;
}

export const PatternSidebarModeToggle = memo(({ maxCols }: PatternSidebarModeToggleProps) => {
  const { isManualMode, toggleManualMode } = usePatternStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between bg-default-50 p-2 rounded-xl border border-default-100">
        <span className="text-[10px] font-bold px-2 text-default-600 uppercase">Ручной режим</span>
        <Switch size="sm" isSelected={isManualMode} onValueChange={() => toggleManualMode(maxCols)} />
      </div>
    </div>
  );
});

PatternSidebarModeToggle.displayName = "PatternSidebarModeToggle";
