import { useCallback } from "react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { extractData } from "./extract-data";

export const useRunExtraction = () => {
    const { sheets, currentSheetIndex } = useSpreadsheetStore();
    const { headerRowIndex, isManualMode, selectedColumns, customNames, constraints, topology, anchor, hiddenColumns, pipeline } = usePatternStore();
    const { setResults } = useExtractionStore();
    
    // Получаем текущий кеш превью
    const { cache } = usePreviewStore(); 

    const runExtraction = useCallback(() => {
        const sheet = sheets[currentSheetIndex];
        if (!sheet || (headerRowIndex === null && !isManualMode)) return;

        const tableHeaderRow = headerRowIndex !== null ? sheet.data[headerRowIndex] : [];

        // Вызываем извлечение, передавая параметры и кеш
        const results = extractData({
            allRows: sheet.data,
            headerRowIndex,
            tableHeaderRow,
            isManualMode,
            selectedColumns,
            customNames,
            constraints,
            topology,
            anchor,
            hiddenColumns,
            pipeline,
            merges: sheet.merges || []
        }, cache);

        setResults(results);
    }, [
        sheets, currentSheetIndex, headerRowIndex, isManualMode, selectedColumns,
        customNames, constraints, topology, anchor, hiddenColumns, pipeline, cache, setResults
    ]);

    return { runExtraction };
};
