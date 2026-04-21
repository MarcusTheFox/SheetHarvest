"use client";

import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { UploadButton } from "@/features/upload-spreadsheet/ui/UploadButton";
import { SpreadsheetTable } from "@/widgets/spreadsheet-view/ui/SpreadsheetTable";
import { PatternSidebar } from "@/widgets/pattern-editor/ui/PatternSidebar";
import { ResultsTable } from "@/widgets/extraction-results/ui/ResultsTable";
import { TableProperties } from "lucide-react";
import { PreviewTable } from "@/widgets/preview-view/ui/PreviewTable";
import { Group, Panel, Separator } from "react-resizable-panels";
import clsx from "clsx";

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

const CustomSeparator = ({className}: {className: string}) => (
  <Separator className={`
    rounded bg-slate-300
    data-[separator='hover']:bg-slate-400
    data-[separator='active']:bg-slate-500
    transition-background
    ${className}
  `} />
)

export const HomePage = () => {
  const hasData = useSpreadsheetStore((state) => state.sheets.length > 0);
  const isExtracted = useExtractionStore((state) => state.isExtracted);

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-2 border-b shrink-0">
        <Logo />
        {!isExtracted && <UploadButton />}
      </header>

      <main className="h-full flex gap-6 p-1">
        {!hasData ? (
          <EmptyPage />
        ) : (
          <>
            {!isExtracted ? (
              <Group orientation="horizontal" className="gap-0.5">
                <Panel minSize={400} defaultSize={400} className="border border-default-200 rounded">
                  <PatternSidebar />
                </Panel>
                <CustomSeparator className="w-1" />
                <Panel>
                  <Group orientation="vertical" className="gap-0.5">
                    <Panel defaultSize="50%" className="border border-default-200 rounded">
                      <SpreadsheetTable />
                    </Panel>
                    <CustomSeparator className="h-1" />
                    <Panel className="border border-default-200 rounded">
                      <PreviewTable />
                    </Panel>
                  </Group>
                </Panel>
              </Group>
            ) : (
              <ResultsTable />
            )}
          </>
        )}
      </main>

      <footer className="h-7 bg-default-700" />
    </div>
  );
};