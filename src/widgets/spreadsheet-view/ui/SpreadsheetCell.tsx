"use client";

import { clsx } from "clsx";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { memo } from "react";
import { SpreadsheetCellMenu } from "./SpreadsheetCellMenu";

interface SpreadsheetCellProps {
  rowIndex: number;
  colIndex: number;
  cellValue: string;
  rowSpan?: number;
  colSpan?: number;
  isActive?: boolean;
  isHidden?: boolean;
  classNames?: string;
  onActivate?: (r: number, c: number) => void;
}

export const SpreadsheetCell = memo((props: SpreadsheetCellProps) => {
  const {
    rowIndex,
    colIndex,
    cellValue,
    rowSpan,
    colSpan,
    isActive,
    isHidden,
    classNames,
    onActivate,
  } = props;

  if (isHidden) return null;

  const cellElement = (
    <td
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={clsx(
        "p-2 border-b border-r border-slate-200 align-top wrap-break-words cursor-cell transition-all",
        isActive && "bg-primary-50 ring-2 ring-primary ring-inset z-10 relative",
        classNames,
      )}
      onClick={() => onActivate?.(rowIndex, colIndex)}
    >
      {cellValue}
    </td>
  );

  if (!isActive) return cellElement;

  return (
    <Popover placement="bottom" showArrow shadow="lg" isOpen={true} onOpenChange={(open) => !open && onActivate?.(-1, -1)}>
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
