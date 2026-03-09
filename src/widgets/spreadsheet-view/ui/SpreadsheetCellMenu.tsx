"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { Listbox, ListboxItem } from "@heroui/react";
import { Flag, XCircle, Table as TableIcon } from "lucide-react";
import { memo } from "react";

interface SpreadsheetCellMenuProps {
  rowIndex: number;
  colIndex: number;
  cellValue: string;
}

export const SpreadsheetCellMenu = memo(({ rowIndex, colIndex, cellValue }: SpreadsheetCellMenuProps) => {
  const { setHeaderRow, setStartAnchor, setEndAnchor } = usePatternStore();

  return (
    <Listbox aria-label="Cell actions" variant="flat">
      <ListboxItem 
        key="header" 
        startContent={<TableIcon size={16}/>}
        onPress={() => setHeaderRow(rowIndex)}
      >
        Сделать заголовком
      </ListboxItem>
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
