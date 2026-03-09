"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { PatternSidebarHeader } from "./PatternSidebarHeader";
import { PatternSidebarModeToggle } from "./PatternSidebarModeToggle";
import { PatternSidebarAnchors } from "./PatternSidebarAnchors";
import { PatternSidebarColumnList } from "./PatternSidebarColumnList";

export const PatternSidebar = () => {
  const { headerRowIndex } = usePatternStore();
  const { sheets, currentSheetIndex } = useSpreadsheetStore();
  
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const maxCols = Math.max(...currentSheet.data.map(r => r.length));
  const headerRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : Array(maxCols).fill("");
  const merges = currentSheet.merges || [];

  return (
    <Card className="w-80 h-[85vh] shrink-0 sticky top-24 border-none shadow-2xl bg-white">
      <CardBody className="gap-4 overflow-y-auto p-5">
        <PatternSidebarHeader />
        <PatternSidebarModeToggle maxCols={maxCols} />
        <PatternSidebarAnchors />
        
        <Divider />
        
        <PatternSidebarColumnList headerRow={headerRow} merges={merges} />

        <div className="mt-auto pt-4">
          <RunExtractionButton />
        </div>
      </CardBody>
    </Card>
  );
};