"use client";

import clsx from "clsx";
import { Table } from "@/shared/ui/Table";
import { getCellMergeInfo } from "../lib/merge-utils";
import { PipelineContext, PipelineRow, PipelineTable } from "@/features/run-extraction/lib/pipeline/core";
import { Spinner } from "@heroui/react";
import { MousePointerClick } from "lucide-react";
import { Fragment } from "react";
import { MergeRange } from "@/shared/types/spreadsheet";

interface SpreadsheetTableContainerProps {
    context?: PipelineContext;
    isLoading?: boolean;
    isExecuting?: boolean;
    emptyMessage?: string;
    showGroupSeparator?: boolean;
}

export const SpreadsheetTableContainer = (props: SpreadsheetTableContainerProps) => {
    const {
        context,
        isLoading = false,
        isExecuting = false,
        emptyMessage = "Нет данных для отображения",
        showGroupSeparator,
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

    const merges = !context.isColumnStructureModified ? (context.params.merges || []) : [];

    return (
        <SpreadsheetTable
            rows={context.rows}
            headers={context.headers}
            merges={merges}
            showGroupSeparator={showGroupSeparator}
        />
    );
};

interface SpreadsheetTableProps {
    rows: PipelineRow[];
    merges?: MergeRange[];
    headers?: string[] | number[];
    showGroupSeparator?: boolean;
}

export const SpreadsheetTable = (props: SpreadsheetTableProps) => {
    const groupMap = new Map<number, PipelineTable>();

    for (const row of props.rows) {
        if (!groupMap.has(row.groupIndex)) {
            groupMap.set(row.groupIndex, {
                id: row.groupIndex,
                name: `#${row.groupIndex}`,
                rows: []
            });
        }
        groupMap.get(row.groupIndex)?.rows.push(row);
    }

    const tables = Array.from(groupMap.values());

    const merges = props.merges ?? [];

    const maxCols = props.rows.reduce((max, row) => Math.max(max, row.cells.length), 0);
    const headers = props.headers?.length
        ? props.headers
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
                    {tables.map((table) => {
                        return (
                            <Fragment key={table.id}>
                                {props.showGroupSeparator && (
                                    <Table.Row>
                                        <Table.Cell
                                            colSpan={headers.length + 1}
                                            className="py-1! bg-slate-200 border-y border-slate-300 font-bold text-slate-500"
                                        >
                                            <div className="flex flex-row justify-between">
                                                <p>
                                                    Таблица: {table.name}
                                                </p>
                                                <p>
                                                    Строк: {table.rows.length}
                                                </p>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}

                                {table.rows.map((row, rowIdx) =>
                                    <Table.Row
                                        key={row.originalIndex}
                                        className={clsx(
                                            "group transition-all",
                                        )}
                                    >
                                        <Table.RowIndexCell>
                                            {row.originalIndex + 1}
                                        </Table.RowIndexCell>
                                        {headers.map((_, idx) => {
                                            const cellValue = row.cells[idx]?.toString() || "";
                                            const { isHidden, rowSpan, colSpan } = getCellMergeInfo(row.originalIndex, idx, merges);

                                            if (isHidden) return null;

                                            return (
                                                <Table.Cell
                                                    key={`${row.originalIndex}-${idx}`}
                                                    rowSpan={rowSpan}
                                                    colSpan={colSpan}
                                                >
                                                    {cellValue}
                                                </Table.Cell>
                                            );
                                        })}
                                    </Table.Row>
                                )}
                            </Fragment>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};