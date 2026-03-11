import { useCallback } from "react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { extractData } from "./extract-data";

export const useRunExtraction = () => {
    const { sheets, currentSheetIndex } = useSpreadsheetStore();
    const { headerRowIndex, isManualMode, customNames, constraints, topology, anchor, hiddenColumns } = usePatternStore();
    const { setResults } = useExtractionStore();

    const runExtraction = useCallback(() => {
        const sheet = sheets[currentSheetIndex];
        if (!sheet || (headerRowIndex === null && !isManualMode)) return;

        const results = extractData({
            allRows: sheet.data,
            headerRowIndex,
            isManualMode,
            customNames,
            constraints,
            topology,
            anchor,
            hiddenColumns,
            merges: sheet.merges || []
        });

        setResults(results);
    }, [
        sheets, currentSheetIndex, headerRowIndex, isManualMode, customNames,
        constraints, topology, anchor, hiddenColumns, setResults
    ]);

    return { runExtraction };
};
