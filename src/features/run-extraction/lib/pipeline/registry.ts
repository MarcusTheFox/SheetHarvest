import { ExtractionLayer } from "./core";
import {
    anchorLayer,
    headerSkipLayer,
    topologyLayer,
    constraintsLayer
} from "./layers/filters";
import {
    projectionLayer,
    valueMappingLayer
} from "./layers/transformers";
import { columnSplitLayer } from "./layers/transformers/columnSplitLayer";
import { regexExtractLayer } from "./layers/transformers/regexExtractLayer";

export interface LayerMetadata {
    id: string;
    name: string;
    description: string;
    layer: ExtractionLayer;
    isSystem?: boolean; // Системные слои, которые лучше не удалять (например, проекция)
    defaultSettings?: Record<string, any>;
}

export const LAYER_REGISTRY: Record<string, LayerMetadata> = {
    'header-skip': {
        id: 'header-skip',
        name: 'Пропуск заголовка',
        description: 'Пропускает строку заголовка и объединенные с ней ячейки',
        layer: headerSkipLayer,
        isSystem: true
    },
    'anchor': {
        id: 'anchor',
        name: 'Якоря (Начало/Конец)',
        description: 'Ограничивает область поиска по текстовым меткам',
        layer: anchorLayer,
        isSystem: true
    },
    'topology': {
        id: 'topology',
        name: 'Топология строк',
        description: 'Фильтрует строки по правилам заполненности колонок',
        layer: topologyLayer,
        isSystem: true
    },
    'constraints': {
        id: 'constraints',
        name: 'Типы данных',
        description: 'Валидирует данные в ячейках (числа, даты)',
        layer: constraintsLayer,
        isSystem: true
    },
    'projection': {
        id: 'projection',
        name: 'Проекция колонок',
        description: 'Оставляет только выбранные колонки и формирует заголовки',
        layer: projectionLayer,
        isSystem: true
    },
    'value-mapping': {
        id: 'value-mapping',
        name: 'Сопоставление значений',
        description: 'Заменяет значения в колонках по загруженному справочнику',
        layer: valueMappingLayer
    },
    'regex-extract': {
        id: 'regex-extract',
        name: 'Regex извлечение',
        description: 'Оставляет в ячейке только текст, подходящий под регулярное выражение',
        layer: regexExtractLayer,
        defaultSettings: {
            keepOriginalIfNoMatch: true,
            pattern: '',
            sourceColIndex: undefined
        }
    },
    'column-split': {
        id: 'column-split',
        name: 'Разделение колонки',
        description: 'Разбивает одну колонку на две или более по символу или Regex',
        layer: columnSplitLayer,
        defaultSettings: {
            mode: 'delimiter',
            delimiter: ',',
            newNames: ['Часть 1', 'Часть 2'],
            sourceColIndex: 0
        }
    }
};

export const DEFAULT_PIPELINE = [
    'anchor',
    'header-skip',
    'topology',
    'constraints',
    'projection'
];
