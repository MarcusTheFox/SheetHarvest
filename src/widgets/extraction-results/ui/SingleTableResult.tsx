"use client";

import { Card, CardHeader, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Download, FileJson, FileSpreadsheet, FileText, Table as TableIcon } from "lucide-react";
import { TableValue } from "@/shared/types/spreadsheet";
import { ResultsTableData } from "./ResultsTableData";
import { exportToCSV, exportToExcel, exportToJSON } from "@/features/run-extraction/lib/export-utils";
import { memo } from "react";
import { TableExportMenu } from "./TableExportMenu";

interface SingleTableResultProps {
  index: number;
  headers: string[];
  data: TableValue;
}

export const SingleTableResult = memo(({ index, headers, data }: SingleTableResultProps) => {
  const fileName = `table_${index + 1}`;

  return (
    <Card className="w-full p-4 shadow-md border border-default-100 bg-white mb-6">
      <CardHeader className="flex justify-between items-center border-b border-default-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-default-100 rounded-lg text-default-600">
            <TableIcon size={20} />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">Таблица №{index + 1}</h3>
            <span className="text-xs text-default-400">{data.length} строк(и)</span>
          </div>
        </div>
        
        <TableExportMenu
            headers={headers}
            data={data}
            fileName={fileName}
        />
      </CardHeader>
      
      <ResultsTableData 
        visibleHeaderNames={headers} 
        results={data} 
      />
    </Card>
  );
});

SingleTableResult.displayName = "SingleTableResult";