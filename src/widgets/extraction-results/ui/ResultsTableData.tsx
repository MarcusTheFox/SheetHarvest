"use client";

import { CellValue, TableValue } from "@/shared/types/spreadsheet";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination } from "@heroui/react";
import { memo, useMemo, useState, useEffect } from "react";

interface ResultsTableDataProps {
  visibleHeaderNames: string[];
  results: TableValue;
}

const ROWS_PER_PAGE = 20; // Количество строк на одной странице

export const ResultsTableData = memo(({ visibleHeaderNames, results }: ResultsTableDataProps) => {
  const [page, setPage] = useState(1);

  // Сбрасываем страницу на первую, если изменились данные
  useEffect(() => {
    setPage(1);
  }, [results]);

  // Считаем общее количество страниц
  const pages = Math.ceil(results.length / ROWS_PER_PAGE);

  // Вырезаем только те строки, которые нужны для текущей страницы
  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return results.slice(start, end);
  }, [page, results]);

  return (
    <div className="overflow-hidden rounded-2xl bg-default-50/30">
      <Table 
        aria-label="Results" 
        removeWrapper 
        shadow="none"
        bottomContent={
          pages > 1 ? (
            <div className="flex w-full justify-center py-4 bg-white border-t border-default-100">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          {visibleHeaderNames.map((name, i) => (
            <TableColumn key={i} className="bg-default-100/50 text-default-600 font-bold py-4 border-none uppercase text-tiny">
              {name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"Нет данных"}>
          {items.map((row, rowIndex) => (
            // Используем индекс + страницу для уникального ключа, если нет ID
            <TableRow key={`${page}-${rowIndex}`} className="hover:bg-white/80 transition-all border-none">
              {visibleHeaderNames.map((_, colIndex) => {
                const cell = row[colIndex] as CellValue;
                return (
                  <TableCell key={colIndex} className="py-3 text-default-700 border-none max-w-[300px] truncate">
                    {cell?.toString() || ""}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

ResultsTableData.displayName = "ResultsTableData";