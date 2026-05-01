"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { UploadButton } from "@/features/upload-spreadsheet/ui/UploadButton";
import { TableProperties, X } from "lucide-react";
import { Workspace } from "@/widgets/spreadsheet-view/ui/Workspace";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { ResultSpace } from "@/widgets/spreadsheet-view/ui/ResultSpace";
import { Button } from "@heroui/button";

const Logo = () => (
  <div className="flex items-center gap-3">
    <TableProperties className="text-primary" size={32} />
    <h1 className="text-2xl font-bold italic tracking-tight">SheetHarvest</h1>
  </div>
)

const EmptyPage = () => (
  <div className="flex-1 self-center mx-auto max-w-300 h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-default-200 rounded-2xl bg-default-50/50">
    <p className="text-default-400 font-medium">Загрузите файл для создания паттерна</p>
  </div>
)

export const HomePage = () => {
  const hasData = useSpreadsheetStore((state) => state.sheets.length > 0);
  const isExtracted = useExtractionStore((state) => state.isExtracted);
  const clearResults = useExtractionStore((state) => state.clearResults);

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-2 border-b shrink-0">
        <Logo />
        <div className="flex flex-row gap-4 items-center">
          {!isExtracted && <UploadButton />}
          {isExtracted && (
            <Button
              variant="flat"
              color="danger"
              className="font-semibold"
              onPress={clearResults}
              startContent={<X size={18} />}
            >
              Закрыть результаты
            </Button>
          )}
          {hasData && !isExtracted && <RunExtractionButton />}
        </div>
      </header>

      <main className="h-full flex gap-6 p-1">
        {!hasData ? (
          <EmptyPage />
        ) : (
          <>
            {!isExtracted ? (
              <Workspace />
            ) : (
              <ResultSpace />
            )}
          </>
        )}
      </main>

      <footer className="h-7 bg-default-700" />
    </div>
  );
};