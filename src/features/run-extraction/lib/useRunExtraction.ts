import { useCallback } from "react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { extractData } from "./extract-data";
import { useExtractionParams } from "./useExtractionParams";
import { usePatternStore } from "@/entities/pattern/model/store";

export const useRunExtraction = () => {
    const params = useExtractionParams();

    const pipeline = usePatternStore(s => s.pipeline);

    const setResults = useExtractionStore(s => s.setResults);
    const cache = usePreviewStore(s => s.cache);

    const runExtraction = useCallback(() => {
        if (!params) {
            console.error('No sheet selected');
            return;
        }

        const results = extractData(params, pipeline, cache);

        setResults(results);
    }, [params, cache, setResults]);

    return { runExtraction };
};
