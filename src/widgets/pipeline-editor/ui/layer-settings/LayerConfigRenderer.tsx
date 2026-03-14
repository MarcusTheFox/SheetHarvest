import { Settings2 } from "lucide-react";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { ValueMappingConfig } from "@/widgets/pipeline-editor/ui/layer-configs/ValueMappingConfig";
import { NoSettingsState } from "./NoSettingsState";
import { RegexExtractConfig } from "../layer-configs/RegexExtractConfig";
import { ColumnSplitConfig } from "../layer-configs/ColumnSplitConfig";

interface LayerConfigRendererProps {
    entry: PipelineLayer;
    index: number;
}

export const LayerConfigRenderer = ({ entry, index }: LayerConfigRendererProps) => {
    const renderConfig = () => {
        switch (entry.id) {
            case 'value-mapping':
                return <ValueMappingConfig index={index} settings={entry.settings} />;
            case 'regex-extract':
                return <RegexExtractConfig index={index} settings={entry.settings} />;
            case 'column-split':
                return <ColumnSplitConfig index={index} settings={entry.settings} />;
            default:
                return <NoSettingsState />;
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 text-default-400">
                <Settings2 size={20} />
                <h4 className="font-bold uppercase tracking-widest text-xs">Конфигурация параметров</h4>
            </div>
            {renderConfig()}
        </div>
    );
};