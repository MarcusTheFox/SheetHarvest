import { PipelineLayer } from "@/entities/pattern/model/types";
import { MergeRange, RowValue, TableValue } from "@/shared/types/spreadsheet";

export interface ExtractionParams {
    tables: PipelineTable[];
    pipeline: PipelineLayer[];
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

export interface PipelineContext<T = unknown> {
    rows: PipelineRow[];
    headers: string[];
    params: ExtractionParams;
    settings?: T;
    isColumnStructureModified: boolean;
}

export type ExtractionLayer<T = unknown> = (context: PipelineContext<T>) => PipelineContext;

export const executePipeline = (initialContext: PipelineContext, layers: ExtractionLayer[]): PipelineContext => {
    return layers.reduce((context, layer) => layer(context), initialContext);
};
