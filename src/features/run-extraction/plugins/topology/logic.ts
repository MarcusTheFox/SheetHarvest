import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineContext } from "../../lib/pipeline/core";
import { TopologyMode } from "@/entities/pattern/model/types";

export function topologyLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;

    const checkTopology = (row: RowValue, topology: Record<number, TopologyMode>): boolean => {
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
        rows: rows.filter(r => checkTopology(r.cells, params.topology))
    };
};