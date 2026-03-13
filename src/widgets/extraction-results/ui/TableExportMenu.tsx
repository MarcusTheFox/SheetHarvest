"use client";

import { exportToCSV, exportToExcel, exportToJSON } from "@/features/run-extraction/lib/export-utils";
import { TableValue } from "@/shared/types/spreadsheet";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-react";
import { memo } from "react";

interface TableExportMenuProps {
    headers: string[];
    data: TableValue;
    fileName: string;
}

export const TableExportMenu = memo(({ headers, data, fileName }: TableExportMenuProps) => {
    return (
        <Dropdown>
            <DropdownTrigger>
            <Button
                variant="flat"
                color="primary"
                size="sm"
                className="font-semibold"
                startContent={<Download size={16} />}
            >
                Экспорт таблицы
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Export single table">
            <DropdownItem
                key="excel"
                startContent={<FileSpreadsheet size={16} className="text-success" />}
                onPress={() => exportToExcel(headers, data, `${fileName}.xlsx`)}
            >
                Excel (.xlsx)
            </DropdownItem>
            <DropdownItem
                key="csv"
                startContent={<FileText size={16} className="text-primary" />}
                onPress={() => exportToCSV(headers, data, `${fileName}.csv`)}
            >
                CSV (.csv)
            </DropdownItem>
            <DropdownItem
                key="json"
                startContent={<FileJson size={16} className="text-warning" />}
                onPress={() => exportToJSON(headers, data, `${fileName}.json`)}
            >
                JSON (.json)
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
});

TableExportMenu.displayName = "TableExportMenu";