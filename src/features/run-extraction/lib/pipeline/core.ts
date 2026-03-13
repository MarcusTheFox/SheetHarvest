import { TopologyMode } from "@/entities/pattern/model/types";
import { MergeRange } from "@/shared/types/spreadsheet";

export interface ExtractionParams {
    allRows: any[][];
    headerRowIndex: number | null;
    tableHeaderRow: any[];
    isManualMode: boolean;
    selectedColumns: number[];
    customNames: Record<number, string>;
    constraints: { colIndex: number; type: any }[];
    topology: Record<number, TopologyMode>;
    anchor: {
        start: { text: string; colIndex: number } | null;
        end: { text: string; colIndex: number } | null;
    };
    hiddenColumns: number[];
    pipeline: Array<{
        id: string;
        instanceId: string;
        settings: Record<string, any>;
    }>;
    merges: MergeRange[];
}

export interface PipelineRow {
    originalIndex: number;
    cells: any[];
}

export interface PipelineContext {
    rows: PipelineRow[];
    headers: string[];
    params: ExtractionParams;
    settings?: Record<string, any>;
}

export type ExtractionLayer = (context: PipelineContext) => PipelineContext;

export const executePipeline = (initialContext: PipelineContext, layers: ExtractionLayer[]): PipelineContext => {
    return layers.reduce((context, layer) => layer(context), initialContext);
};
