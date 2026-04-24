import { PipelineLayer } from "@/entities/pattern/model/types";
import { MergeRange, RowValue, TableValue } from "@/shared/types/spreadsheet";

export interface ExtractionParams {
    allRows: TableValue;
    headerRowIndex: number | null;
    tableHeaderRow: RowValue;
    isManualMode: boolean;
    selectedColumns: number[];
    customNames: Record<number, string>;
    hiddenColumns: number[];
    pipeline: PipelineLayer[];
    merges: MergeRange[];
}

export interface PipelineRow {
    originalIndex: number;
    cells: RowValue;
    groupIndex: number;
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
