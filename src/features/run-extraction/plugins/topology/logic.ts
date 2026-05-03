import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineContext, PipelineTable } from "../../lib/pipeline/core";
import { TopologyLayerSettings } from "./types";

export function topologyLayer(context: PipelineContext, settings: TopologyLayerSettings): PipelineContext {
    const { tables } = context;
    const topology = settings.topology ?? {};

    if (Object.keys(topology).length === 0) {
        return context;
    }

    const checkTopology = (row: RowValue, topology: Record<number, 'any' | 'filled' | 'empty'>): boolean => {
        return Object.entries(topology).every(([colIdx, mode]) => {
            const idx = Number(colIdx);
            const val = row[idx];
            const isNotEmpty = val !== null && val !== undefined && val.toString().trim() !== '';
            if (mode === 'filled') return isNotEmpty;
            if (mode === 'empty') return !isNotEmpty;
            return true;
        });
    };

    const processTable = (table: PipelineTable): PipelineTable => {
        const rows = table.rows.filter(row => checkTopology(row.cells, topology));
        return {
            ...table,
            rows,
        }
    }

    const newTables = tables.map(table => processTable(table));

    return { ...context, tables: newTables };
};