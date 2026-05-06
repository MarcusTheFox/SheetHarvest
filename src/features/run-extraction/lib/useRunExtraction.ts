import { useCallback } from "react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { extractData } from "./extract-data";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";

export const useRunExtraction = () => {
    const sourceTables = useSpreadsheetStore(s => s.sourceTables);

    const pipeline = usePatternStore(s => s.pipeline);

    const setResults = useExtractionStore(s => s.setResults);
    const cache = usePreviewStore(s => s.cache);

    const runExtraction = useCallback(() => {
        if (!sourceTables.length) {
            console.error('No sheets data');
            return;
        }

        const results = extractData(sourceTables, pipeline, cache);

        setResults(results);
    }, [sourceTables, cache, setResults]);

    return { runExtraction };
};
