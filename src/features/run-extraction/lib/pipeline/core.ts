import { MergeRange, RowValue } from "@/shared/types/spreadsheet";

export interface ExtractionParams {
    tables: PipelineTable[];
}

export interface PipelineRow {
    originalIndex: number;
    cells: RowValue;
    groupIndex: number;
}

export interface PipelineTable {
    rows: PipelineRow[];
    name: string;
    id: number;
    merges?: MergeRange[];
}

export interface PipelineContext {
    rows: PipelineRow[];
    headers: string[];
    params: ExtractionParams;
    isColumnStructureModified: boolean;
}

export type ExtractionLayer<T = never> = (context: PipelineContext, settings: T) => PipelineContext;