"use client";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Card, Button } from "@heroui/react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { X, FileJson } from "lucide-react";

export const ResultsTable = () => {
  const { results, clearResults } = useExtractionStore();
  const { headerRowIndex, isManualMode, customNames, hiddenColumns } = usePatternStore();
  const { sheets, currentSheetIndex } = useSpreadsheetStore();

  if (results.length === 0 || (!isManualMode && headerRowIndex === null)) return null;

  const currentSheet = sheets[currentSheetIndex];
  const tableHeaderRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : [];
  const merges = currentSheet.merges || [];
  
  // Рассчитываем заголовки по той же логике, что и в Engine
  const maxCols = Math.max(...currentSheet.data.map(r => r.length));
  const visibleHeaderNames = Array.from({length: maxCols}, (_, i) => i)
    .filter(idx => {
      const isHidden = hiddenColumns.includes(idx);
      const isSecondary = headerRowIndex !== null && isSecondaryMergeCell(headerRowIndex, idx, merges);
      if (isManualMode) return !isHidden;
      const hasContent = !!tableHeaderRow[idx] || !!customNames[idx];
      return !isHidden && !isSecondary && hasContent;
    })
    .map(idx => customNames[idx] || tableHeaderRow[idx]?.toString() || String.fromCharCode(65 + idx));

  return (
    <Card className="w-full p-6 shadow-2xl border-none bg-white">
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-default-800">Результаты извлечения</h2>
          <p className="text-sm text-default-500">Найдено <span className="text-success font-bold">{results.length}</span> строк</p>
        </div>
        <div className="flex gap-3">
          <Button variant="flat" color="primary" className="font-semibold" startContent={<FileJson size={18}/>}>JSON</Button>
          <Button variant="light" color="danger" className="font-semibold" onPress={clearResults} startContent={<X size={18}/>}>Закрыть</Button>
        </div>
      </div>

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
                {row.map((cell: any, colIndex: number) => (
                  <TableCell key={colIndex} className="py-4 text-default-700 border-none">
                    {cell?.toString() || ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};