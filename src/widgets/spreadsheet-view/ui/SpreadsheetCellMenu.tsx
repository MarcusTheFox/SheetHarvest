"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { Listbox, ListboxItem } from "@heroui/react";
import { Table as TableIcon, Columns } from "lucide-react";
import { memo } from "react";
import { useShallow } from "zustand/shallow";

interface SpreadsheetCellMenuProps {
  rowIndex: number;
  colIndex: number;
  cellValue: string;
}

export const SpreadsheetCellMenu = memo(({ rowIndex, colIndex, cellValue }: SpreadsheetCellMenuProps) => {
  const { isManualMode, selectedColumns, setHeaderRow, toggleColumn } = usePatternStore(
    useShallow(s => ({
      isManualMode: s.isManualMode,
      selectedColumns: s.selectedColumns,
      setHeaderRow: s.setHeaderRow,
      toggleColumn: s.toggleColumn,
    }))
  );

  const isColumnSelected = selectedColumns.includes(colIndex);

  return (
    <Listbox aria-label="Cell actions" variant="flat">
      {isManualMode ? (
        <ListboxItem
          key="toggle-column"
          startContent={<Columns size={16} />}
          color={isColumnSelected ? "danger" : "primary"}
          className={isColumnSelected ? "text-danger" : "text-primary"}
          onPress={() => toggleColumn(colIndex)}
        >
          {isColumnSelected ? "Убрать из паттерна" : "Добавить в паттерн"}
        </ListboxItem>
      ) : (
        <ListboxItem 
          key="header" 
          startContent={<TableIcon size={16}/>}
          onPress={() => setHeaderRow(rowIndex)}
        >
          Сделать заголовком
        </ListboxItem>
      )}
    </Listbox>
  );
});

SpreadsheetCellMenu.displayName = "SpreadsheetCellMenu";
