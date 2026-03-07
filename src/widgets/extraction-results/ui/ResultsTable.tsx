"use client";

import { 
  Table, TableHeader, TableBody, 
  TableColumn, TableRow, TableCell, 
  Card, Button 
} from "@heroui/react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { isSecondaryMergeCell } from "@/widgets/spreadsheet-view/lib/merge-utils";
import { X, FileJson } from "lucide-react";

export const ResultsTable = () => {
  const { results, clearResults } = useExtractionStore();
  const { headerRowIndex, hiddenColumns } = usePatternStore();
  const { sheets, currentSheetIndex } = useSpreadsheetStore();

  // Ранний выход: если результатов нет или заголовок не выбран — ничего не рендерим
  if (results.length === 0 || headerRowIndex === null) return null;

  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const headerRow = currentSheet.data[headerRowIndex];
  const merges = currentSheet.merges || [];
  
  // Создаем константу для TS, чтобы он "запомнил", что это число
  const safeHeaderRowIndex = headerRowIndex;

  // Формируем заголовки только для уникальных и видимых колонок
  const visibleHeaders = headerRow.filter((_, idx) => {
    // Используем safeHeaderRowIndex, который гарантированно number
    const isSecondary = isSecondaryMergeCell(safeHeaderRowIndex, idx, merges);
    const isHidden = hiddenColumns.includes(idx);
    return !isSecondary && !isHidden;
  });

  return (
    <Card className="w-full p-6 shadow-2xl border-none bg-white">
      {/* Шапка результатов */}
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-default-800">
            Результаты извлечения
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-sm text-default-500 font-medium">
              Найдено <span className="text-success font-bold">{results.length}</span> строк
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="flat" 
            color="primary" 
            className="font-semibold"
            startContent={<FileJson size={18}/>}
          >
            Экспорт JSON
          </Button>
          <Button 
            variant="light" 
            color="danger" 
            className="font-semibold"
            onPress={clearResults} 
            startContent={<X size={18}/>}
          >
            Закрыть
          </Button>
        </div>
      </div>

      {/* Таблица без границ */}
      <div className="overflow-hidden rounded-2xl bg-default-50/30">
        <Table 
          aria-label="Extraction results" 
          isHeaderSticky 
          removeWrapper 
          shadow="none"
          className="min-h-[200px]"
        >
          <TableHeader>
            {visibleHeaders.map((name, i) => (
              <TableColumn 
                key={i} 
                className="bg-default-100/50 text-default-600 font-bold py-4 border-none uppercase text-tiny"
              >
                {name?.toString() || `Кол. ${i + 1}`}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent="Ничего не найдено">
            {results.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                className="hover:bg-white/80 transition-all cursor-default group"
              >
                {visibleHeaders.map((_, colIndex) => (
                  <TableCell 
                    key={colIndex} 
                    className="py-4 text-default-700 border-none group-hover:text-primary transition-colors"
                  >
                    {row[colIndex]?.toString() || ""}
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