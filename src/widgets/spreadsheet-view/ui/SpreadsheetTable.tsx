"use client";

import clsx from "clsx";
import { Table } from "@/shared/ui/Table";
import { getCellMergeInfo } from "../lib/merge-utils";
import { PipelineContext } from "@/features/run-extraction/lib/pipeline/core";
import { Spinner } from "@heroui/react";
import { MousePointerClick } from "lucide-react";

interface SpreadsheetTableProps {
    context?: PipelineContext;
    isLoading?: boolean;
    isExecuting?: boolean;
    emptyMessage?: string;
}

export const SpreadsheetTable = (props: SpreadsheetTableProps) => {
    const {
        context,
        isLoading = false,
        isExecuting = false,
        emptyMessage = "Нет данных для отображения",
    } = props;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full gap-3 text-default-400">
                <Spinner size="sm" />
                <span className="text-xs">Вычисляем контекст...</span>
            </div>
        );
    }

    if (!context) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-400">
                {isExecuting ? (
                    <>
                        <Spinner size="sm" />
                        <p className="text-xs">Выполнение...</p>
                    </>
                ) : (
                    <>
                        <MousePointerClick size={24} className="opacity-30" />
                        <p className="text-xs font-medium">{emptyMessage}</p>
                    </>
                )}
            </div>
        );
    }

    const rows = context.rows;
    const merges = context.params.merges || [];

    const maxCols = rows.reduce((max, row) => Math.max(max, row.cells.length), 0);
    const headers = context.headers.length
        ? context.headers
        : Array.from({ length: maxCols }, (_, i) => i);

    return (
        <div className="overflow-auto border-none bg-white">
            <Table stickyHeader stickyRowIndex>
                <Table.Header>
                    <Table.HeaderRow>
                        <Table.CornerCell />
                        {headers.map((header, idx) => (
                            <Table.HCell key={`${header}-${idx}`}>
                                {header}
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
                            )}
                        >
                            <Table.RowIndexCell>
                                {row.originalIndex + 1}
                            </Table.RowIndexCell>
                            {headers.map((_, idx) => {
                                const cellValue = row.cells[idx]?.toString() || "";
                                const { isHidden, rowSpan, colSpan } = getCellMergeInfo(rowIndex, idx, merges);

                                if (isHidden) return null;

                                return (
                                    <Table.Cell
                                        key={`${rowIndex}-${idx}`}
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