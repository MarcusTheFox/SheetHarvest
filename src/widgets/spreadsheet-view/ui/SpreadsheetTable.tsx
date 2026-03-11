"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { SpreadsheetHeader } from "./SpreadsheetHeader";
import { SpreadsheetRow } from "./SpreadsheetRow";

export const SpreadsheetTable = () => {
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const rows = currentSheet.data.slice(0, 150);
  const merges = currentSheet.merges || [];
  const maxCols = Math.max(...rows.map(r => r.length));
  const columns = Array.from({ length: maxCols }, (_, i) => i);

  return (
    <div className="overflow-auto border-none rounded-2xl bg-white shadow-xl max-h-[75vh] w-full">
      <table className="w-full border-collapse text-sm">
        <SpreadsheetHeader columns={columns} />
        <tbody>
          {rows.map((row, rowIndex) => (
            <SpreadsheetRow
              key={rowIndex}
              rowIndex={rowIndex}
              row={row}
              columns={columns}
              merges={merges}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};