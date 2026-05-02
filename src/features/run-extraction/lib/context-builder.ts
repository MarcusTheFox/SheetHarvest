import { PipelineContext, PipelineTable } from "./pipeline/core";
import { createHeadersFromTables } from "./pipeline/utils";

export const createInitialContext = (tables: PipelineTable[]): PipelineContext => {
    return {
        tables: structuredClone(tables),
        headers: createHeadersFromTables(tables),
        params: {tables},
        isColumnStructureModified: false,
    };
};