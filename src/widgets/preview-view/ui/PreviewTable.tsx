"use client";

import { usePreviewStore } from "@/entities/preview/model/store";
import { PipelineRow } from "@/features/run-extraction/lib/pipeline/core";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Chip, Card, CardHeader } from "@heroui/react";
import { Table as TableIcon, LayoutGrid, Rows } from "lucide-react";
import { useMemo } from "react";

const PREVIEW_LIMIT = 50; // Сколько строк показывать для каждой таблицы в превью

export const PreviewTable = () => {
  const { cache, activePreviewId } = usePreviewStore();
  
  // 1. Безопасно достаем данные для хука (чтобы хуки всегда вызывались)
  const context = activePreviewId ? cache[activePreviewId] : null;
  const rows = context?.rows || [];
  const headers = context?.headers || [];

  // 2. Группируем строки по groupIndex (хук вызывается всегда до любого return!)
  const groupedTables = useMemo(() => {
    const map = new Map<number, PipelineRow[]>();
    for (const row of rows) {
      if (!map.has(row.groupIndex)) {
        map.set(row.groupIndex, []);
      }
      map.get(row.groupIndex)!.push(row);
    }
    // Сортируем по индексу группы, чтобы порядок был правильным
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [rows]);

  // 3. Теперь можно делать ранний возврат, если нет кеша
  if (!context) {
    return (
      <div className="flex-1 h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-default-200 rounded-2xl bg-default-50/50">
        <p className="text-default-400 font-medium">Запустите слой в пайплайне (кнопка Play) для просмотра результата</p>
      </div>
    );
  }

  // 4. Формируем заголовки (если до проекции их нет — генерируем A, B, C...)
  const maxCols = rows.length > 0 ? Math.max(...rows.map(r => r.cells.length)) : 0;
  const displayHeaders = headers.length > 0 
    ? headers 
    : Array.from({ length: maxCols }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="flex flex-col gap-4 w-full h-[75vh] overflow-hidden">
      
      {/* Топ-бар с общей статистикой превью */}
      <div className="shrink-0 flex justify-between items-center bg-primary-50 px-4 py-3 rounded-xl border border-primary-100">
        <span className="text-sm font-bold text-primary-700">Промежуточный результат (Превью)</span>
        <div className="flex gap-3">
            <Chip size="sm" variant="flat" color="primary" startContent={<LayoutGrid size={14} className="ml-1"/>}>
              Таблиц: {groupedTables.length}
            </Chip>
            <Chip size="sm" variant="flat" color="success" startContent={<Rows size={14} className="ml-1"/>}>
              Всего строк: {rows.length}
            </Chip>
            <Chip size="sm" variant="flat" color="secondary">
              Колонок: {displayHeaders.length}
            </Chip>
        </div>
      </div>

      {/* Список сгенерированных таблиц */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pb-8 pr-2 scrollbar-hide">
        {groupedTables.length === 0 && (
           <div className="py-12 text-center text-default-400 text-sm border-2 border-dashed rounded-2xl bg-default-50/50">
             После применения слоев не осталось ни одной строки данных.
           </div>
        )}

        {groupedTables.map(([groupIndex, groupRows], idx) => {
          const previewRows = groupRows.slice(0, PREVIEW_LIMIT);
          const hasMore = groupRows.length > PREVIEW_LIMIT;

          return (
            <Card key={groupIndex} className="shadow-sm border border-default-100 shrink-0">
              <CardHeader className="flex justify-between items-center border-b border-default-100 bg-default-50/50 py-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white shadow-sm border border-default-100 rounded-md text-default-500">
                    <TableIcon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-default-800">Таблица №{idx + 1}</h3>
                    <span className="text-[10px] text-default-500">Строк в этой таблице: {groupRows.length}</span>
                  </div>
                </div>
                {hasMore && (
                  <Chip size="sm" variant="dot" color="warning" className="border-none bg-warning-50">
                    Показаны первые {PREVIEW_LIMIT} строк
                  </Chip>
                )}
              </CardHeader>
              
              <div className="overflow-x-auto">
                <Table aria-label={`Preview Table ${idx + 1}`} removeWrapper shadow="none" className="min-w-max">
                  <TableHeader>
                    {displayHeaders.map((name, i) => (
                      <TableColumn key={i} className="bg-white text-default-600 font-bold py-3 uppercase text-xs border-b border-default-100">
                        {name}
                      </TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {previewRows.map((row) => (
                      <TableRow key={row.originalIndex} className="hover:bg-default-50 transition-colors border-b border-default-50 last:border-none">
                        {displayHeaders.map((_, colIndex) => (
                          <TableCell key={colIndex} className="py-2 text-sm text-default-700 max-w-[200px] truncate">
                            {row.cells[colIndex]?.toString() || ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};