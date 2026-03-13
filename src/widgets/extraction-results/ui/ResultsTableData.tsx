"use client";

import { CellValue } from "@/shared/types/spreadsheet";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/react";
import { memo } from "react";

interface ResultsTableDataProps {
  visibleHeaderNames: string[];
  results: CellValue[][];
}

export const ResultsTableData = memo(({ visibleHeaderNames, results }: ResultsTableDataProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-default-50/30">
      <Table aria-label="Results" removeWrapper shadow="none">
        <TableHeader>
          {visibleHeaderNames.map((name, i) => (
            <TableColumn key={i} className="bg-default-100/50 text-default-600 font-bold py-4 border-none uppercase text-tiny">
              {name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {results.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-white/80 transition-all border-none">
              {row.map((cell: CellValue, colIndex: number) => (
                <TableCell key={colIndex} className="py-4 text-default-700 border-none">
                  {cell?.toString() || ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

ResultsTableData.displayName = "ResultsTableData";
