"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { PatternSidebarColumn } from "./PatternSidebarColumn";
import { MergeRange } from "@/entities/spreadsheet/model/store";
import { memo } from "react";

interface PatternSidebarColumnListProps {
  headerRow: any[];
  merges: MergeRange[];
}

export const PatternSidebarColumnList = memo(({ headerRow, merges }: PatternSidebarColumnListProps) => {
  const { headerRowIndex, isManualMode } = usePatternStore();

  if (headerRowIndex === null && !isManualMode) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {headerRow.map((cell, idx) => {
        if (headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges)) {
          return null;
        }

        return (
          <PatternSidebarColumn 
            key={idx} 
            idx={idx} 
            cell={cell as string | undefined} 
          />
        );
      })}
    </div>
  );
});

PatternSidebarColumnList.displayName = "PatternSidebarColumnList";
