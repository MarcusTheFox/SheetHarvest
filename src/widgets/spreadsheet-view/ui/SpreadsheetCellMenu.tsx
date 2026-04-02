"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { Listbox, ListboxItem } from "@heroui/react";
import { Flag, XCircle, Table as TableIcon, Columns } from "lucide-react";
import { memo } from "react";
import { useShallow } from "zustand/shallow";

interface SpreadsheetCellMenuProps {
  rowIndex: number;
  colIndex: number;
  cellValue: string;
}

export const SpreadsheetCellMenu = memo(({ rowIndex, colIndex, cellValue }: SpreadsheetCellMenuProps) => {
  const { isManualMode, selectedColumns, setHeaderRow, setStartAnchor, setEndAnchor, toggleColumn } = usePatternStore(
    useShallow(s => ({
      isManualMode: s.isManualMode,
      selectedColumns: s.selectedColumns,
      setHeaderRow: s.setHeaderRow,
      setStartAnchor: s.setStartAnchor,
      setEndAnchor: s.setEndAnchor,
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
      <ListboxItem 
        key="start" 
        className="text-success"
        color="success"
        startContent={<Flag size={16}/>}
        onPress={() => setStartAnchor({ text: cellValue, colIndex })}
      >
        Начать поиск отсюда
      </ListboxItem>
      <ListboxItem 
        key="end" 
        className="text-danger"
        color="danger"
        startContent={<XCircle size={16}/>}
        onPress={() => setEndAnchor({ text: cellValue, colIndex })}
      >
        Закончить поиск здесь
      </ListboxItem>
    </Listbox>
  );
});

SpreadsheetCellMenu.displayName = "SpreadsheetCellMenu";
