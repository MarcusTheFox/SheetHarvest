import { ValueMappingConfig } from "./ValueMappingConfig";
import { ColumnSplitConfig } from "./ColumnSplitConfig";
import { RegexExtractConfig } from "./RegexExtractConfig";

export interface LayerConfigProps<T = unknown> {
    index: number;
    settings: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LAYER_CONFIG_COMPONENTS: Record<string, React.FC<LayerConfigProps<any>>> = {
    'value-mapping': ValueMappingConfig,
    'column-split': ColumnSplitConfig,
    'regex-extract': RegexExtractConfig,
};