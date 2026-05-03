export interface ProjectionColumn {
    index: number;
    name?: string;
}

export interface ProjectionLayerSettings {
    mode: 'auto' | 'manual';
    // Используется в режиме 'manual'
    columns: ProjectionColumn[]; 
    // Используется в режиме 'auto' (индекс строки в исходном файле)
    headerRowIndex: number;
}