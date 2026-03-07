"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { UploadButton } from "@/features/upload-spreadsheet/ui/UploadButton";
import { SpreadsheetTable } from "@/widgets/spreadsheet-view/ui/SpreadsheetTable";
import { PatternSidebar } from "@/widgets/pattern-editor/ui/PatternSidebar";
import { ResultsTable } from "@/widgets/extraction-results/ui/ResultsTable";
import { TableProperties } from "lucide-react";

export const HomePage = () => {
  const hasData = useSpreadsheetStore((state) => state.sheets.length > 0);
  const isExtracted = useExtractionStore((state) => state.isExtracted);

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col gap-6">
      <header className="flex justify-between items-center bg-white/80 backdrop-blur sticky top-0 z-50 py-2 border-b">
        <div className="flex items-center gap-3">
          <TableProperties className="text-primary" size={32} />
          <h1 className="text-2xl font-bold italic tracking-tight">SheetHarvest</h1>
        </div>
        {!isExtracted && <UploadButton />}
      </header>

      <main className="flex gap-6 items-start">
        {!hasData ? (
          <div className="flex-1 h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-default-200 rounded-2xl bg-default-50/50">
            <p className="text-default-400 font-medium">Загрузите файл для создания паттерна</p>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-6">
              {isExtracted ? <ResultsTable /> : <SpreadsheetTable />}
            </div>
            {!isExtracted && <PatternSidebar />}
          </>
        )}
      </main>
    </div>
  );
};