export interface ColumnSplitLayerSettings {
    sourceColIndex: number;
    mode: 'delimiter' | 'regex';
    delimiter?: string;
    pattern?: string;
    newNames: string[];
}