import clsx from "clsx";
import React, { createContext, useContext } from "react";

type TableContextValue = {
    stickyHeader?: boolean;
    stickyRowIndex?: boolean;
};

const TableContext = createContext<TableContextValue | null>( null );

const useTable = () => {
    const ctx = useContext( TableContext );
    if ( !ctx ) throw new Error( "Table components must be used inside <Table>" );
    return ctx;
};

type TableProps = React.HTMLAttributes<HTMLTableElement> & TableContextValue;

export const Table = ({
    stickyHeader,
    stickyRowIndex,
    className,
    ...rest
}: TableProps ) => {
    return (
        <TableContext.Provider value={{ stickyHeader, stickyRowIndex }}>
            <table
                { ...rest }
                className={ clsx(
                    "w-full border-separate border-spacing-0 text-xs",
                    className,
                ) }
            />
        </TableContext.Provider>
    );
};

const TableHeader = ( props: React.HTMLAttributes<HTMLTableSectionElement> ) => {
    return <thead { ...props } />;
};

const TableHeaderRow = ( props: React.HTMLAttributes<HTMLTableRowElement> ) => {
    return <tr { ...props } />;
};

const TableHCell = ({
    className,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> ) => {
    const { stickyHeader } = useTable();

    return (
        <th
            { ...props }
            className={ clsx(
                "px-3 py-2 bg-gray-100 text-center font-semibold border-y border-r border-gray-300",
                stickyHeader && "sticky top-0 z-20",
                className,
            ) }
        />
    );
};

const TableCornerCell = ({
    className,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> ) => {
    const { stickyHeader, stickyRowIndex } = useTable();

    return (
        <th
            { ...props }
            className={ clsx(
                "px-3 py-2 bg-gray-200 font-semibold border border-gray-300",
                stickyHeader && stickyRowIndex && "sticky top-0 left-0 z-40",
                className,
            ) }
        />
    );
};

const TableBody = ( props: React.HTMLAttributes<HTMLTableSectionElement> ) => {
    return <tbody { ...props } />;
};

const TableRow = ( props: React.HTMLAttributes<HTMLTableRowElement> ) => {
    return <tr { ...props } className={ `${ props.className ?? "" } hover:bg-slate-100` } />;
};

const TableRowIndexCell = ({
    className,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> ) => {
    const { stickyRowIndex } = useTable();

    return (
        <td
            { ...props }
            className={ clsx(
                "px-2 py-2 bg-gray-100 text-gray-600 text-center w-10 border-b border-x border-gray-300",
                stickyRowIndex && "sticky left-0 z-30",
                className,
            ) }
        />
    );
};

const TableCell = ({
    className,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> ) => {
    return (
        <td
            { ...props }
            className={ clsx(
                "px-3 py-2 border-b border-r border-slate-200",
                className,
            ) }
        />
    );
};

Table.displayName = "Table";
TableHeader.displayName = "Table.Header";
TableHeaderRow.displayName = "Table.HeaderRow";
TableHCell.displayName = "Table.HCell";
TableCornerCell.displayName = "Table.CornerCell";
TableBody.displayName = "Table.Body";
TableRow.displayName = "Table.Row";
TableRowIndexCell.displayName = "Table.RowIndexCell";
TableCell.displayName = "Table.Cell";

Table.Header = TableHeader;
Table.HeaderRow = TableHeaderRow;
Table.HCell = TableHCell;
Table.CornerCell = TableCornerCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.RowIndexCell = TableRowIndexCell;
Table.Cell = TableCell;
