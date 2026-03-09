"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { clsx } from "clsx";
import { SpreadsheetCell } from "./SpreadsheetCell";
import { MergeRange } from "@/entities/spreadsheet/model/store";
import { memo } from "react";

interface SpreadsheetRowProps {
  rowIndex: number;
  row: any[];
  columns: number[];
  merges: MergeRange[];
}

export const SpreadsheetRow = memo(({ rowIndex, row, columns, merges }: SpreadsheetRowProps) => {
  const { headerRowIndex } = usePatternStore();

  return (
    <tr 
      className={clsx(
        "group transition-all",
        headerRowIndex === rowIndex ? "bg-primary-50/50" : "hover:bg-default-50"
      )}
    >
      {columns.map((colIndex) => {
        const cellValue = row[colIndex]?.toString() || "";

        return (
          <SpreadsheetCell
            key={colIndex}
            rowIndex={rowIndex}
            colIndex={colIndex}
            cellValue={cellValue}
            merges={merges}
          />
        );
      })}
    </tr>
  );
});

SpreadsheetRow.displayName = "SpreadsheetRow";
