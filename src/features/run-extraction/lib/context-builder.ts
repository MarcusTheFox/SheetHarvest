import { PipelineContext, PipelineTable } from "@/shared/types/pipeline";
import { createHeadersFromTables } from "@/shared/lib/utils";

export const createInitialContext = ( tables: PipelineTable[]): PipelineContext => {
    return {
        tables: structuredClone( tables ),
        headers: createHeadersFromTables( tables ),
        isColumnStructureModified: false,
    };
};
