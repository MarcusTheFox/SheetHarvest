import { LayerMetadata } from "../../lib/pipeline/types";
import { regexExtractLayer } from "./logic";
import { RegexExtractionLayerSettings } from "./types";
import { RegexExtractConfig } from "./ui";

export const regexExtractLayerMetadata: LayerMetadata<RegexExtractionLayerSettings> = {
    id: 'regex-extract',
    name: 'Regex извлечение',
    description: 'Оставляет в ячейке только текст, подходящий под регулярное выражение',
    layer: regexExtractLayer,
    defaultSettings: {
        keepOriginalIfNoMatch: true,
        pattern: '',
        sourceColIndex: undefined
    },
    component: RegexExtractConfig,
}