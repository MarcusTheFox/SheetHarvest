import { TopologyMode, ConstraintType, LayerSettings } from "@/entities/pattern/model/types";
import { MergeRange, RowValue, TableValue } from "@/shared/types/spreadsheet";

export interface ExtractionParams {
    allRows: TableValue;
    headerRowIndex: number | null;
    tableHeaderRow: RowValue;
    isManualMode: boolean;
    selectedColumns: number[];
    customNames: Record<number, string>;
    constraints: { colIndex: number; type: ConstraintType }[];
    topology: Record<number, TopologyMode>;
    anchor: {
        start: { text: string; colIndex: number } | null;
        end: { text: string; colIndex: number } | null;
    };
    hiddenColumns: number[];
    pipeline: Array<{
        id: string;
        instanceId: string;
        settings: LayerSettings;
    }>;
    merges: MergeRange[];
}

export interface PipelineRow {
    originalIndex: number;
    cells: RowValue;
}

export interface PipelineContext {
    rows: PipelineRow[];
    headers: string[];
    params: ExtractionParams;
    settings?: LayerSettings;
}

export type ExtractionLayer = (context: PipelineContext) => PipelineContext;

export const executePipeline = (initialContext: PipelineContext, layers: ExtractionLayer[]): PipelineContext => {
    return layers.reduce((context, layer) => layer(context), initialContext);
};
