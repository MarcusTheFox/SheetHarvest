import clsx from "clsx";
import React, { createContext, useContext } from "react";

/* =========================
   CONTEXT
========================= */

type TableContextValue = {
    stickyHeader?: boolean;
    stickyRowIndex?: boolean;
};

const TableContext = createContext<TableContextValue | null>(null);

const useTable = () => {
    const ctx = useContext(TableContext);
    if (!ctx) throw new Error("Table components must be used inside <Table>");
    return ctx;
};

/* =========================
   TABLE ROOT
========================= */

type TableProps = React.HTMLAttributes<HTMLTableElement> & TableContextValue;

export const Table = ({
    stickyHeader,
    stickyRowIndex,
    className,
    ...rest
}: TableProps) => {
    return (
        <TableContext.Provider value={{ stickyHeader, stickyRowIndex }}>
            <table
                {...rest}
                className={clsx(
                    "w-full border-separate border-spacing-0 text-xs",
                    className,
                )}
            />
        </TableContext.Provider>
    );
};

/* =======================
   HEADER
======================= */

Table.Header = (props: React.HTMLAttributes<HTMLTableSectionElement>) => {
    return <thead {...props} />;
};

Table.HeaderRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => {
    return <tr {...props} />;
};

Table.HCell = ({
    className,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const { stickyHeader } = useTable();

    return (
        <th
            {...props}
            className={clsx(
                "px-3 py-2 bg-gray-100 text-center font-semibold border-y border-r border-gray-300",
                stickyHeader && "sticky top-0 z-20",
                className,
            )}
        />
    );
};

/* =======================
   TOP-LEFT CORNER CELL
======================= */

Table.CornerCell = ({
    className,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const { stickyHeader, stickyRowIndex } = useTable();

    return (
        <th
            {...props}
            className={clsx(
                "px-3 py-2 bg-gray-200 font-semibold border border-gray-300",
                stickyHeader && stickyRowIndex && "sticky top-0 left-0 z-40",
                className,
            )}
        />
    );
};

/* =======================
   BODY
======================= */

Table.Body = (props: React.HTMLAttributes<HTMLTableSectionElement>) => {
    return <tbody {...props} />;
};

Table.Row = (props: React.HTMLAttributes<HTMLTableRowElement>) => {
    return <tr {...props} className={`${props.className ?? ""} hover:bg-slate-100`} />;
};

/* =======================
   ROW INDEX (LEFT STICKY)
======================= */

Table.RowIndexCell = ({
    className,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const { stickyRowIndex } = useTable();

    return (
        <td
            {...props}
            className={clsx(
                "px-2 py-2 bg-gray-100 text-gray-600 text-center w-10 border-b border-x border-gray-300",
                stickyRowIndex && "sticky left-0 z-30",
                className,
            )}
        />
    );
};

/* =======================
   NORMAL CELL
======================= */

Table.Cell = ({
    className,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <td
            {...props}
            className={clsx(
                "px-3 py-2 border-b border-r border-slate-200",
                className,
            )}
        />
    );
};