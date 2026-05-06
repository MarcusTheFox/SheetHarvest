import { useCallback } from "react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { extractData } from "./extract-data";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";

export const useRunExtraction = () => {
    const setResults = useExtractionStore(s => s.setResults);
    
    const runExtraction = useCallback(() => {
        const cache = usePreviewStore.getState().cache;
        const pipeline = usePatternStore.getState().pipeline;
        const sourceTables = useSpreadsheetStore.getState().sourceTables;
        
        if (!sourceTables.length) {
            console.error('No sheets data');
            return;
        }

        const results = extractData(sourceTables, pipeline, cache);

        setResults(results);
    }, [setResults]);

    return { runExtraction };
};
