import { ValueMappingConfig } from "@/features/run-extraction/plugins/value-mapping/ui";
import { ColumnSplitConfig } from "@/features/run-extraction/plugins/column-split/ui";
import { RegexExtractConfig } from "@/features/run-extraction/plugins/regex-extract/ui";

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