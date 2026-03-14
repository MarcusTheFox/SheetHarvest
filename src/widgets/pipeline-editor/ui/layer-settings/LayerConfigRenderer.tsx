import { Settings2 } from "lucide-react";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { NoSettingsState } from "./NoSettingsState";
import { LAYER_CONFIG_COMPONENTS } from "../layer-configs";

interface LayerConfigRendererProps {
    entry: PipelineLayer;
    index: number;
}

export const LayerConfigRenderer = ({ entry, index }: LayerConfigRendererProps) => {
    const ConfigComponent = LAYER_CONFIG_COMPONENTS[entry.id];

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 text-default-400">
                <Settings2 size={20} />
                <h4 className="font-bold uppercase tracking-widest text-xs">Конфигурация параметров</h4>
            </div>
            
            {ConfigComponent ? (
                <ConfigComponent index={index} settings={entry.settings} />
            ) : (
                <NoSettingsState />
            )}
        </div>
    );
};