import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineContext } from "../../lib/pipeline/core";
import { TopologyLayerSettings } from "./types";

export function topologyLayer(context: PipelineContext, settings: TopologyLayerSettings): PipelineContext {
    const { rows } = context;
    const topology = settings?.topology ?? {};

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

    return {
        ...context,
        rows: rows.filter(r => checkTopology(r.cells, topology))
    };
};