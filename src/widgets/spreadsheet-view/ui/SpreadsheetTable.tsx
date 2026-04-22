"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import clsx from "clsx";
import { Table } from "@/shared/ui/Table";
import { useSelectedLayer } from "../lib/useSelectedLayer";
import { getCellMergeInfo } from "../lib/merge-utils";

export const SpreadsheetTable = () => {
    const { inputContext } = useSelectedLayer();

    const headerRowIndex = usePatternStore(s => s.headerRowIndex);

    if (!inputContext) return null;

    const rows = inputContext.rows;
    const merges = inputContext.params.merges || [];
    const maxCols = Math.max(...rows.map(r => r.cells.length));
    const columns = Array.from({ length: maxCols }, (_, i) => i);

    return (
        <div className="overflow-auto border-none bg-white">
            <Table stickyHeader stickyRowIndex>
                <Table.Header>
                    <Table.HeaderRow>
                        {columns.map(i => (
                            <Table.HCell key={i}>
                                {String.fromCharCode(65 + i)}
                            </Table.HCell>
                        ))}
                    </Table.HeaderRow>
                </Table.Header>
                <Table.Body>
                    {rows.map((row, rowIndex) => (
                        <Table.Row
                            key={rowIndex}
                            className={clsx(
                                "group transition-all",
                                headerRowIndex === rowIndex ? "bg-primary-50/50" : "hover:bg-default-50"
                            )}
                        >
                            {columns.map((colIndex) => {
                                const cellValue = row.cells[colIndex]?.toString() || "";
                                const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, colIndex, merges);

                                if (isHidden) return null;
                                
                                return (
                                    <Table.Cell
                                      key={`${rowIndex}-${colIndex}`}
                                      rowSpan={rowSpan}
                                      colSpan={colSpan}
                                    >
                                      {cellValue}
                                    </Table.Cell>
                                );
                            })}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};