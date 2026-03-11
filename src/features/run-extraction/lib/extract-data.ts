import {
    checkTopology,
    checkConstraints,
    getActiveColIndices,
    projectRows
} from "./extraction-utils";
import { TopologyMode } from "@/entities/pattern/model/types";
import { MergeRange } from "@/entities/spreadsheet/model/store";

interface ExtractDataParams {
    allRows: any[][];
    headerRowIndex: number | null;
    isManualMode: boolean;
    customNames: Record<number, string>;
    constraints: { colIndex: number; type: any }[];
    topology: Record<number, TopologyMode>;
    anchor: {
        start: { text: string; colIndex: number } | null;
        end: { text: string; colIndex: number } | null;
    };
    hiddenColumns: number[];
    merges: MergeRange[];
}

export const extractData = (params: ExtractDataParams): any[][] => {
    const {
        allRows, headerRowIndex, isManualMode, customNames,
        constraints, topology, anchor, hiddenColumns, merges
    } = params;

    const tableHeaderRow = headerRowIndex !== null ? allRows[headerRowIndex] : [];

    // Состояние активности поиска (если нет стартового якоря — мы активны сразу)
    let isSearchActive = !anchor.start;
    const finalFilteredRows: any[][] = [];

    // Главный цикл по строкам таблицы
    for (let i = 0; i < allRows.length; i++) {
        const row = allRows[i];

        // ПРОВЕРКА СТАРТОВОГО ЯКОРЯ
        if (anchor.start && !isSearchActive) {
            const cellValue = row[anchor.start.colIndex]?.toString();
            if (cellValue === anchor.start.text) {
                isSearchActive = true;
                continue; // Саму строку якоря обычно не берем в данные
            }
        }

        // ПРОВЕРКА КОНЕЧНОГО ЯКОРЯ
        if (anchor.end && isSearchActive) {
            const cellValue = row[anchor.end.colIndex]?.toString();
            if (cellValue === anchor.end.text) {
                isSearchActive = false;
                break; // Прекращаем поиск полностью
            }
        }

        // Если мы в активной фазе поиска
        if (isSearchActive) {
            // Пропускаем заголовок, если мы не в ручном режиме
            if (!isManualMode && i <= (headerRowIndex || -1)) continue;

            // 1. ТОПОЛОГИЯ
            if (!checkTopology(row, topology)) {
                continue;
            }

            // 2. CONSTRAINTS
            if (!checkConstraints(row, constraints)) {
                continue;
            }

            finalFilteredRows.push(row);
        }
    }

    // ОПРЕДЕЛЕНИЕ ВИДИМЫХ ИНДЕКСОВ
    const activeColIndices = getActiveColIndices({
        allRows,
        headerRowIndex,
        tableHeaderRow,
        hiddenColumns,
        isManualMode,
        customNames,
        merges
    });

    // ПРОЕКЦИЯ
    return projectRows(finalFilteredRows, activeColIndices);
};
