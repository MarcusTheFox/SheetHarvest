import { MergeRange, RowValue } from "@/shared/types/spreadsheet";

export interface ExtractionParams {
    tables: PipelineTable[];
}

export interface PipelineRow {
    originalIndex: number;
    cells: RowValue;
}

export interface PipelineTable {
    rows: PipelineRow[];
    name: string;
    id: string;
    merges?: MergeRange[];
}

export interface PipelineContext {
    tables: PipelineTable[];
    headers: string[];
    isColumnStructureModified: boolean;
}

export type ExtractionLayer<T = never> = (context: PipelineContext, settings: T) => PipelineContext;