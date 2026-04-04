"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { getCellMergeInfo } from "../lib/merge-utils";
import { clsx } from "clsx";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { MergeRange } from "@/shared/types/spreadsheet";
import { memo } from "react";
import { SpreadsheetCellMenu } from "./SpreadsheetCellMenu";

interface SpreadsheetCellProps {
  rowIndex: number;
  colIndex: number;
  cellValue: string;
  merges: MergeRange[];
}

export const SpreadsheetCell = memo(({ rowIndex, colIndex, cellValue, merges }: SpreadsheetCellProps) => {
  const headerRowIndex = usePatternStore(s => s.headerRowIndex);

  const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, colIndex, merges);
  if (isHidden) return null;

  return (
    <Popover placement="bottom" showArrow shadow="lg">
      <PopoverTrigger>
        <td
          rowSpan={rowSpan}
          colSpan={colSpan}
          className={clsx(
            "p-3 border-b border-r border-default-50 align-top break-words cursor-cell transition-all",
            headerRowIndex === rowIndex && "font-bold text-primary"
          )}
        >
          {cellValue}
        </td>
      </PopoverTrigger>

      <PopoverContent className="p-1">
        <SpreadsheetCellMenu 
          rowIndex={rowIndex} 
          colIndex={colIndex} 
          cellValue={cellValue} 
        />
      </PopoverContent>
    </Popover>
  );
});

SpreadsheetCell.displayName = "SpreadsheetCell";
