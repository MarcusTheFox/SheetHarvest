import { ExtractionLayer } from "../../core";

export const headerSkipLayer: ExtractionLayer = (context) => {
    const { rows, params } = context;
    if (params.isManualMode || params.headerRowIndex === null) {
        return context;
    }

    let skipUntilRow = params.headerRowIndex;

    // Учитываем объединения ячеек, чтобы пропустить все строки, в которых "застревает" многострочный заголовок
    if (params.merges && params.merges.length > 0) {
        for (const merge of params.merges) {
            // Если merge пересекает строку заголовка
            if (merge.s.r <= params.headerRowIndex && merge.e.r >= params.headerRowIndex) {
                skipUntilRow = Math.max(skipUntilRow, merge.e.r);
            }
        }
    }

    return {
        ...context,
        // Пропускаем строки, индекс которых меньше или равен вычисленному индексу
        rows: rows.filter(r => r.originalIndex > skipUntilRow)
    };
};
