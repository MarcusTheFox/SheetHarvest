import { exportToCSV, exportToExcel, exportToJSON } from "@/shared/lib/export-utils";
import { PipelineTable } from "@/shared/types/pipeline";
import { useCallback } from "react";

const tableToExcelSheet = ( table: PipelineTable, headers: string[], customName?: string ) => ({
    name: customName || table.name,
    rows: [ headers, ...table.rows.map(( row ) => row.cells ) ],
});

const tableToJson = ( table: PipelineTable, headers: string[]) => {
    return table.rows.map(( row ) =>
        Object.fromEntries( headers.map(( h, i ) => [ h || `col_${ i }`, row.cells[i] ])));
};

export const useExport = () => {
    const exportTable = useCallback(( table: PipelineTable, headers: string[], name: string, format: "xlsx" | "json" | "csv" ) => {
        switch ( format ) {
            case "xlsx":
                exportToExcel([ tableToExcelSheet( table, headers, name ) ], name );
                break;
            case "json":
                exportToJSON( tableToJson( table, headers ), name );
                break;
            case "csv":
                const rows = table.rows.map(( r ) => r.cells );
                exportToCSV( rows, headers, name );
                break;
        }
    }, []);

    const exportAll = useCallback(( tables: PipelineTable[], headers: string[], customNames?: Record<string, string> ) => {
        const sheets = tables.map(( t ) => ({
            name: customNames?.[t.id] ?? t.name,
            rows: [ headers, ...t.rows.map(( r ) => r.cells ) ],
        }));
        exportToExcel( sheets, "All_Results_Extractions" );
    }, []);

    return {
        exportTable,
        exportAll,
    };
};
