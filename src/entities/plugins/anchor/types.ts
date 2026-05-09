export interface AnchorPoint {
    text: string;
    colIndex: number;
}

export interface AnchorLayerSettings {
    start: AnchorPoint | null;
    end: AnchorPoint | null;
    mergeResults?: boolean;
}
