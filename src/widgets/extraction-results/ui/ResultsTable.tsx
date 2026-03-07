"use client";

import { 
  Table, TableHeader, TableBody, 
  TableColumn, TableRow, TableCell, 
  Card, Button 
} from "@heroui/react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { X, Download } from "lucide-react";

export const ResultsTable = () => {
  const { results, clearResults } = useExtractionStore();
  const { constraints } = usePatternStore();

  if (results.length === 0) return null;

  return (
    <Card className="w-full p-4 border-2 border-success-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Результаты извлечения 
          <span className="text-success text-sm bg-success-50 px-2 py-1 rounded-full">
            Найдено строк: {results.length}
          </span>
        </h2>
        <div className="flex gap-2">
          <Button size="sm" color="danger" variant="flat" onPress={clearResults} startContent={<X size={16}/>}>
            Закрыть
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[60vh]">
        <Table aria-label="Extraction results" isHeaderSticky removeWrapper shadow="none">
          <TableHeader>
            {constraints.length > 0 ? (
              constraints.map((c) => (
                <TableColumn key={c.colIndex}>{c.name || `Кол. ${c.colIndex + 1}`}</TableColumn>
              ))
            ) : (
              <TableColumn>Данные</TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="Ничего не найдено">
            {results.map((row, i) => (
              <TableRow key={i} className="hover:bg-success-50/30">
                {constraints.map((c) => (
                  <TableCell key={c.colIndex}>
                    {row[c.colIndex]?.toString() || ""}
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