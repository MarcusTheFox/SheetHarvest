import { RowValue } from "@/shared/types/spreadsheet";
import { PipelineContext, PipelineRow } from "../../core";
import { LayerMetadata } from "../../types";

export const headerSkipLayerMetadata: LayerMetadata = {
    id: 'header-skip',
    name: 'Пропуск заголовка',
    description: 'Пропускает строку заголовка и объединенные с ней ячейки',
    isSystem: true,
    layer: headerSkipLayer,
}

export function headerSkipLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;
    if (params.isManualMode || params.headerRowIndex === null) {
        return context;
    }

    const originalHeaderRow = params.allRows[params.headerRowIndex];
    if (!originalHeaderRow) return context;

    const getSignature = (row: RowValue) => row.map(cell => String(cell ?? '').trim()).join('|');
    const headerSignature = getSignature(originalHeaderRow);

    let headerHeight = 1;

    if (params.merges && params.merges.length > 0) {
        for (const merge of params.merges) {
            if (merge.s.r === params.headerRowIndex && merge.e.r >= params.headerRowIndex) {
                headerHeight = Math.max(headerHeight, (merge.e.r - merge.s.r) + 1);
            }
        }
    }
    
    const isHeaderCapturedByAnchors = rows.some(r => r.originalIndex === params.headerRowIndex);

    const groupsMap = new Map<number, PipelineRow[]>();
    rows.forEach(row => {
        if (!groupsMap.has(row.groupIndex)) {
            groupsMap.set(row.groupIndex, []);
        }
        groupsMap.get(row.groupIndex)!.push(row);
    });

    const processedRows: PipelineRow[] = [];

    groupsMap.forEach((groupRows) => {
        if (groupRows.length === 0) return;

        const headerIdxInGroup = groupRows.findIndex(r => getSignature(r.cells) === headerSignature);

        if (headerIdxInGroup !== -1) {
            processedRows.push(...groupRows.slice(headerIdxInGroup + headerHeight));
        } else if (isHeaderCapturedByAnchors) {
            return;
        } else {
            processedRows.push(...groupRows);
        }
    });

    return {
        ...context,
        rows: processedRows
    };
};