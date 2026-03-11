"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { PatternSidebarColumn } from "./PatternSidebarColumn";
import { MergeRange } from "@/entities/spreadsheet/model/store";
import { memo } from "react";
import { Columns } from "lucide-react";

interface PatternSidebarColumnListProps {
  headerRow: any[];
  merges: MergeRange[];
}

export const PatternSidebarColumnList = memo(({ headerRow, merges }: PatternSidebarColumnListProps) => {
  const { headerRowIndex, isManualMode, selectedColumns } = usePatternStore();

  if (headerRowIndex === null && !isManualMode) {
    return null;
  }

  // В ручном режиме рендерим только явно выбранные колонки
  const columnIndices = isManualMode
    ? selectedColumns
    : headerRow.map((_, idx) => idx).filter(
      idx => headerRowIndex !== null && !isSecondaryMergeCell(headerRowIndex, idx, merges)
    );

  if (isManualMode && columnIndices.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-default-400">
        <Columns size={28} className="opacity-40" />
        <p className="text-[11px] text-center">
          Кликните на ячейку в таблице и выберите «Добавить в паттерн»
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {columnIndices.map((idx) => (
        <PatternSidebarColumn 
          key={idx} 
          idx={idx} 
          cell={headerRow[idx] as string | undefined} 
        />
      ))}
    </div>
  );
});

PatternSidebarColumnList.displayName = "PatternSidebarColumnList";
