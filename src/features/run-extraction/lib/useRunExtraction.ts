import { useCallback, useMemo } from "react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { extractData } from "./extract-data";
import { useShallow } from "zustand/shallow";

export const useRunExtraction = () => {
    const { sheets, currentSheetIndex } = useSpreadsheetStore(
        useShallow(s => ({
            sheets: s.sheets,
            currentSheetIndex: s.currentSheetIndex,
        }))
    );
    const pattern = usePatternStore(
        useShallow(s => ({
            headerRowIndex: s.headerRowIndex,
            isManualMode: s.isManualMode,
            selectedColumns: s.selectedColumns,
            customNames: s.customNames,
            hiddenColumns: s.hiddenColumns,
            pipeline: s.pipeline,
        }))
    );
    const setResults = useExtractionStore(s => s.setResults);
    
    const cache = usePreviewStore(s => s.cache);

    const currentSheet = useMemo(() => {
        return sheets[currentSheetIndex];
    }, [sheets, currentSheetIndex]);

    const isValid = useMemo(() => {
        if (!currentSheet) {
            console.warn('No sheet selected');
            return false;
        }
        return true;
    }, [currentSheet]);

    const runExtraction = useCallback(() => {
        if (!isValid) return;

        const tableHeaderRow = pattern.headerRowIndex !== null ? currentSheet.data[pattern.headerRowIndex] : [];

        const results = extractData({
            allRows: currentSheet.data,
            tableHeaderRow,
            merges: currentSheet.merges || [],
            ...pattern,
        }, cache);

        setResults(results);
    }, [
        sheets, currentSheetIndex, pattern, cache, setResults
    ]);

    return { runExtraction };
};
