import { PipelineContext, PipelineTable } from "@/shared/types/pipeline";
import { createHeadersFromTables } from "./pipeline/utils";

export const createInitialContext = ( tables: PipelineTable[]): PipelineContext => {
    return {
        tables: structuredClone( tables ),
        headers: createHeadersFromTables( tables ),
        isColumnStructureModified: false,
    };
};
