import { Settings2 } from "lucide-react";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { NoSettingsState } from "./NoSettingsState";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { usePatternStore } from "@/entities/pattern/model/store";
import { PipelineContext } from "@/features/run-extraction/lib/pipeline/core";

interface LayerConfigRendererProps {
    entry: PipelineLayer;
    index: number;
    prevContext?: PipelineContext;
}

export const LayerConfigRenderer = ({ entry, index, prevContext }: LayerConfigRendererProps) => {
    const updateLayerSettings = usePatternStore(s => s.updateLayerSettings);

    const ConfigComponent = LAYER_REGISTRY[entry.id]?.component;

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 text-default-400">
                <Settings2 size={20} />
                <h4 className="font-bold uppercase tracking-widest text-xs">Конфигурация параметров</h4>
            </div>
            
            {ConfigComponent ? (
                <ConfigComponent
                    settings={entry.settings}
                    prevContext={prevContext}
                    onUpdate={(settings) => {updateLayerSettings(index, settings)}}
                />
            ) : (
                <NoSettingsState />
            )}
        </div>
    );
};