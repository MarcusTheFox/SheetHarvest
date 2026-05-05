import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { PipelineTable } from "./pipeline/core";

export const useExtractionSource = (): PipelineTable[] => {
    return useSpreadsheetStore(s => s.sourceTables);
};