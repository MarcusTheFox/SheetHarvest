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
  isActive: boolean;
  onActivate: (r: number, c: number) => void;
}

export const SpreadsheetCell = memo(({ rowIndex, colIndex, cellValue, merges, isActive, onActivate }: SpreadsheetCellProps) => {
  const headerRowIndex = usePatternStore(s => s.headerRowIndex);

  const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, colIndex, merges);
  if (isHidden) return null;

  const cellElement = (
    <td
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={clsx(
        "p-3 border-b border-r border-default-50 align-top break-words cursor-cell transition-all",
        headerRowIndex === rowIndex && "font-bold text-primary text-medium",
        isActive && "bg-primary-50 ring-2 ring-primary ring-inset z-10 relative"
      )}
      onClick={() => onActivate(rowIndex, colIndex)}
    >
      {cellValue}
    </td>
  );

  if (!isActive) return cellElement;

  return (
    <Popover placement="bottom" showArrow shadow="lg" isOpen={true} onOpenChange={(open) => !open && onActivate(-1, -1)}>
      <PopoverTrigger>
        {cellElement}
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
