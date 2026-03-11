"use client";

import { Card } from "@heroui/react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { ResultsTableTopBar } from "./ResultsTableTopBar";
import { ResultsTableData } from "./ResultsTableData";

export const ResultsTable = () => {
  const { results, headers, clearResults, isExtracted } = useExtractionStore();

  if (!isExtracted || results.length === 0) return null;

  return (
    <Card className="w-full p-6 shadow-2xl border-none bg-white">
      <ResultsTableTopBar
        resultsCount={results.length}
        onClear={clearResults}
      />
      <ResultsTableData
        visibleHeaderNames={headers}
        results={results}
      />
    </Card>
  );
};