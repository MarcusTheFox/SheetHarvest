"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { useState, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { usePatternStore } from "@/entities/pattern/model/store";
import clsx from "clsx";
import { SpreadsheetCell } from "./SpreadsheetCell";
import { getCellMergeInfo } from "../lib/merge-utils";

export const SpreadsheetTable = () => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore(
    useShallow(s => ({
      sheets: s.sheets,
      currentSheetIndex: s.currentSheetIndex
    }))
  );

  const headerRowIndex = usePatternStore(s => s.headerRowIndex);

  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);
  
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const rows = currentSheet.data.slice(0, 150);
  const merges = currentSheet.merges || [];
  const maxCols = Math.max(...rows.map(r => r.length));
  const columns = Array.from({ length: maxCols }, (_, i) => i);

  const onCellActivate = useCallback((r: number, c: number) => {
    setActiveCell({ r, c });
  }, []);

  return (
    <div className="overflow-auto border-none rounded-2xl bg-white shadow-xl max-h-full">
      <table className="w-full border-collapse text-xs">
        <thead className="sticky top-0 z-20 bg-default-100">
          <tr>
            {columns.map(i => (
              <th key={i} className="p-3 outline outline-default-200 font-mono text-[10px] text-default-400 uppercase">
                {String.fromCharCode(65 + i)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={clsx(
                "group transition-all",
                headerRowIndex === rowIndex ? "bg-primary-50/50" : "hover:bg-default-50"
              )}
            >
              {columns.map((colIndex) => {
                const cellValue = row[colIndex]?.toString() || "";
                const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, colIndex, merges);
        
                return (
                  <SpreadsheetCell
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    cellValue={cellValue}
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                    isActive={activeCell?.r === rowIndex && activeCell?.c === colIndex}
                    isHidden={isHidden}
                    onActivate={onCellActivate}
                    classNames={headerRowIndex === rowIndex ? "text-primary" : ""}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};