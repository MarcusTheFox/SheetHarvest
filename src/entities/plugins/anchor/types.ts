export interface AnchorPoint {
    text: string;
    colIndex: number;
}

export interface AnchorLayerSettings {
    start: AnchorPoint | null;
    end: AnchorPoint | null;
    includeStart?: boolean;
    includeEnd?: boolean;
    mergeResults?: boolean;
}
