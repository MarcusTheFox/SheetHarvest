"use client";

import { useExtractionStore } from "@/entities/extraction/model/store";
import { ResultsTableTopBar } from "./ResultsTableTopBar";
import { SingleTableResult } from "./SingleTableResult";
import { useMemo } from "react";

export const ResultsTable = () => {
  const { results, headers, clearResults, isExtracted } = useExtractionStore();

  // Считаем общее кол-во строк во всех таблицах
  const totalRowsCount = useMemo(() => 
    results.reduce((acc, table) => acc + table.length, 0), 
  [results]);

  if (!isExtracted || results.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-2">
      <ResultsTableTopBar
        tablesCount={results.length}
        totalRowsCount={totalRowsCount}
        onClear={clearResults}
      />
      
      <div className="flex flex-col">
        {results.map((tableData, idx) => (
          <SingleTableResult 
            key={idx}
            index={idx}
            headers={headers}
            data={tableData}
          />
        ))}
      </div>
    </div>
  );
};