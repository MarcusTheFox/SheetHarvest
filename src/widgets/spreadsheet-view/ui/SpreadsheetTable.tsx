"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { getCellMergeInfo } from "../lib/merge-utils";
import { clsx } from "clsx";

export const SpreadsheetTable = () => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const { headerRowIndex, setHeaderRow } = usePatternStore();
  
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const rows = currentSheet.data.slice(0, 100);
  const merges = currentSheet.merges || [];
  
  // Определяем макс. количество колонок
  const maxCols = Math.max(...rows.map(r => r.length));
  const columns = Array.from({ length: maxCols }, (_, i) => i);

  return (
    <div className="overflow-auto border rounded-2xl border-default-200 bg-white shadow-sm max-h-[75vh]">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-20 bg-default-100">
          <tr>
            {columns.map(i => (
              <th key={i} className="p-2 border-b border-r border-default-200 font-mono text-xs text-default-500 min-w-[100px]">
                {String.fromCharCode(65 + i)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => setHeaderRow(rowIndex)}
              className={clsx(
                "group cursor-pointer transition-colors",
                headerRowIndex === rowIndex ? "bg-primary-50" : "hover:bg-default-50"
              )}
            >
              {columns.map((colIndex) => {
                const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, colIndex, merges);
                
                if (isHidden) return null; // Не рендерим ячейку, если она перекрыта объединением

                return (
                  <td
                    key={colIndex}
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                    className={clsx(
                      "p-2 border-b border-r border-default-100 align-top break-words",
                      headerRowIndex === rowIndex && "font-bold text-primary border-primary-100"
                    )}
                  >
                    {row[colIndex]?.toString() || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};