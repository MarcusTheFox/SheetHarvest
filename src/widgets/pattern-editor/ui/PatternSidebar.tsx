"use client";

import { Card, CardBody, CardFooter, Divider, Tabs, Tab } from "@heroui/react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { PatternSidebarHeader } from "./PatternSidebarHeader";
import { PatternSidebarModeToggle } from "./PatternSidebarModeToggle";
import { PatternSidebarColumnList } from "./PatternSidebarColumnList";
import { PatternSidebarPipeline } from "./PatternSidebarPipeline";
import { Layers, Columns, FolderOpen } from "lucide-react";
import { PatternSidebarTemplates } from "./PatternSidebarTemplates";

export const PatternSidebar = () => {
  const headerRowIndex = usePatternStore(s => s.headerRowIndex);
  const sheets = useSpreadsheetStore(s => s.sheets);
  const currentSheetIndex = useSpreadsheetStore(s => s.currentSheetIndex);
  
  const currentSheet = sheets[currentSheetIndex];
  if (!currentSheet) return null;

  const headerRow = headerRowIndex !== null ? currentSheet.data[headerRowIndex] : currentSheet.data[0] || [];
  const merges = currentSheet.merges || [];

  return (
    <Card className="w-80 h-[85vh] shrink-0 sticky top-24 border-none shadow-2xl bg-white">
      <CardBody className="gap-4 overflow-y-auto p-5 scrollbar-hide">
        <PatternSidebarHeader />
        <PatternSidebarModeToggle />
        
        <Divider />

        <Tabs
          fullWidth
          variant="light"
          size="sm"
          classNames={{
            tabList: "bg-default-100 rounded-xl p-1",
            cursor: "bg-white shadow-sm rounded-lg",
            tab: "h-8"
          }}
        >
          <Tab
            key="columns"
            title={
              <div className="flex items-center gap-2">
                <Columns size={14} />
                <span>Колонки</span>
              </div>
            }
          >
            <div className="pt-2">
              <PatternSidebarColumnList headerRow={headerRow} merges={merges} />
            </div>
          </Tab>
          <Tab
            key="pipeline"
            title={
              <div className="flex items-center gap-2">
                <Layers size={14} />
                <span>Пайплайн</span>
              </div>
            }
          >
            <div className="pt-2">
              <PatternSidebarPipeline />
            </div>
          </Tab>
          <Tab
            key="templates"
            title={
              <div className="flex items-center gap-2">
                <FolderOpen size={14} />
                <span>Шаблоны</span>
              </div>
            }
          >
            <div className="pt-2">
              <PatternSidebarTemplates />
            </div>
          </Tab>
        </Tabs>

      </CardBody>
      <CardFooter className="border-t-2 border-default-100 shrink-0">
        <div className="mx-auto my-2">
          <RunExtractionButton />
        </div>
      </CardFooter>
    </Card>
  );
};