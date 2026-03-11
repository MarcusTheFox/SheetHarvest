import { ExtractionLayer } from "./core";
import {
    anchorLayer,
    headerSkipLayer,
    topologyLayer,
    constraintsLayer
} from "./layers/filters";
import {
    projectionLayer,
    splitColumnExampleLayer
} from "./layers/transformers";

export interface LayerMetadata {
    id: string;
    name: string;
    description: string;
    layer: ExtractionLayer;
    isSystem?: boolean; // Системные слои, которые лучше не удалять (например, проекция)
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
    'split-example': {
        id: 'split-example',
        name: 'Разбиение "Артикул, Штрихкод"',
        description: 'Демонстрационный слой: разбивает одну колонку на две по запятой',
        layer: splitColumnExampleLayer
    }
};

export const DEFAULT_PIPELINE = [
    'header-skip',
    'anchor',
    'topology',
    'constraints',
    'projection'
];
