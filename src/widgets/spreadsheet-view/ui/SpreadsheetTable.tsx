"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { getCellMergeInfo } from "../lib/merge-utils";
import { clsx } from "clsx";
import { Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem } from "@heroui/react";
import { Flag, XCircle, Table as TableIcon } from "lucide-react";

export const SpreadsheetTable = () => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  const { headerRowIndex, setHeaderRow, setStartAnchor, setEndAnchor, anchor } = usePatternStore();
  
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const rows = currentSheet.data.slice(0, 150); // Увеличим превью
  const merges = currentSheet.merges || [];
  const maxCols = Math.max(...rows.map(r => r.length));
  const columns = Array.from({ length: maxCols }, (_, i) => i);

  return (
    <div className="overflow-auto border-none rounded-2xl bg-white shadow-xl max-h-[75vh]">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-20 bg-default-100">
          <tr>
            {columns.map(i => (
              <th key={i} className="p-3 border-r border-default-200 font-mono text-[10px] text-default-400 uppercase">
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
                const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, colIndex, merges);
                if (isHidden) return null;

                const cellValue = row[colIndex]?.toString() || "";
                const isStartAnchor = anchor.start?.text === cellValue && anchor.start?.colIndex === colIndex;
                const isEndAnchor = anchor.end?.text === cellValue && anchor.end?.colIndex === colIndex;

                return (
                  <Popover key={colIndex} placement="bottom" showArrow shadow="lg">
                    <PopoverTrigger>
                      <td
                        rowSpan={rowSpan}
                        colSpan={colSpan}
                        className={clsx(
                          "p-3 border-b border-r border-default-50 align-top break-words cursor-cell transition-all",
                          headerRowIndex === rowIndex && "font-bold text-primary",
                          isStartAnchor && "bg-success-100 text-success-700 font-bold border-l-4 border-l-success",
                          isEndAnchor && "bg-danger-100 text-danger-700 font-bold border-l-4 border-l-danger"
                        )}
                      >
                        {cellValue}
                      </td>
                    </PopoverTrigger>
                    <PopoverContent className="p-1">
                      <Listbox aria-label="Cell actions" variant="flat">
                        <ListboxItem 
                          key="header" 
                          startContent={<TableIcon size={16}/>}
                          onPress={() => setHeaderRow(rowIndex)}
                        >
                          Сделать заголовком
                        </ListboxItem>
                        <ListboxItem 
                          key="start" 
                          className="text-success"
                          color="success"
                          startContent={<Flag size={16}/>}
                          onPress={() => setStartAnchor({ text: cellValue, colIndex })}
                        >
                          Начать поиск отсюда
                        </ListboxItem>
                        <ListboxItem 
                          key="end" 
                          className="text-danger"
                          color="danger"
                          startContent={<XCircle size={16}/>}
                          onPress={() => setEndAnchor({ text: cellValue, colIndex })}
                        >
                          Закончить поиск здесь
                        </ListboxItem>
                      </Listbox>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};