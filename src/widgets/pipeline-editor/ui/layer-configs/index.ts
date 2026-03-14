import { ValueMappingConfig } from "./ValueMappingConfig";
import { ColumnSplitConfig } from "./ColumnSplitConfig";
import { RegexExtractConfig } from "./RegexExtractConfig";

export const LAYER_CONFIG_COMPONENTS: Record<string, React.FC<any>> = {
    'value-mapping': ValueMappingConfig,
    'column-split': ColumnSplitConfig,
    'regex-extract': RegexExtractConfig,
};