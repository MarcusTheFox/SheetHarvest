import { PipelineContext, PipelineRow, PipelineTable } from "@/shared/types/pipeline";
import { AnchorLayerSettings } from "./types";

export function anchorLayer( context: PipelineContext, settings: AnchorLayerSettings ): PipelineContext {
    const { tables } = context;
    const anchor = settings ?? { start: null, end: null };

    const processTable = ( table: PipelineTable ): PipelineTable[] => {
        let isSearchActive = !anchor.start;
        let subTableIndex = 0;
        let currentSubTableRows: PipelineRow[] = [];
        const subTables: PipelineTable[] = [];

        const addRow = ( row: PipelineRow ) => {
            currentSubTableRows.push( row );
        };

        const createSubTable = ( merged: boolean ) => {
            const id = merged ? table.id : `${ table.id }-${ subTableIndex }`;
            const name = merged ? table.name : `${ table.name }_${ subTableIndex + 1 }`;

            subTables.push({
                id,
                name,
                merges: table.merges,
                rows: [ ...currentSubTableRows ],
            });
        };

        for ( const row of table.rows ) {
            // Проверка стартового якоря
            if ( anchor.start && anchor.start.text && !isSearchActive ) {
                const cellValue = row.cells[anchor.start.colIndex]?.toString();
                if ( cellValue && cellValue.includes( anchor.start.text )) {
                    isSearchActive = true;
                    if ( anchor.includeStart ) {
                        addRow( row );
                    }
                    continue;
                }
            }

            // Проверка конечного якоря
            if ( anchor.end && anchor.end.text && isSearchActive ) {
                const cellValue = row.cells[anchor.end.colIndex]?.toString();
                if ( cellValue && cellValue.includes( anchor.end.text )) {
                    if ( anchor.includeEnd ) {
                        addRow( row );
                    }
                    isSearchActive = false;
                    if ( currentSubTableRows.length > 0 && !anchor.mergeResults ) {
                        createSubTable( false );
                        subTableIndex++;
                        currentSubTableRows = [];
                    }
                    continue;
                }
            }

            if ( isSearchActive ) {
                addRow( row );
            }
        }

        if ( anchor.mergeResults ) {
            createSubTable( true );
        }
        else if ( currentSubTableRows.length > 0 ) {
            createSubTable( false );
        }

        return subTables;
    };

    return {
        ...context,
        tables: tables.map( processTable ).flat(),
    };
}
