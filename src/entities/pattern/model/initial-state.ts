import { DEFAULT_PIPELINE, LAYER_REGISTRY } from "@/features/plugins/registry";
import { ExtractionPattern } from "./types";
import { createInstID } from "@/shared/lib/utils";

export const getInitialState = (): ExtractionPattern => ({
    pipeline: DEFAULT_PIPELINE.map(( id ) => {
        const metadata = LAYER_REGISTRY[id];
        return {
            id,
            instanceId: createInstID(id),
            settings: metadata.defaultSettings ? { ...metadata.defaultSettings } : {},
        };
    }),
});
