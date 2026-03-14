import { ScrollShadow } from "@heroui/react";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { EmptyLayerState } from "./EmptyLayerState";
import { LayerSettingsHeader } from "./LayerSettingsHeader";
import { LayerConfigRenderer } from "./LayerConfigRenderer";

interface LayerSettingsPanelProps {
    selectedEntry: PipelineLayer | null;
    selectedIndex: number | null;
    onRemove: (index: number) => void;
}

export const LayerSettingsPanel = ({ selectedEntry, selectedIndex, onRemove }: LayerSettingsPanelProps) => {
    if (!selectedEntry || selectedIndex === null) {
        return <EmptyLayerState />;
    }

    const metadata = LAYER_REGISTRY[selectedEntry.id];

    return (
        <div className="flex flex-col h-full bg-white">
            <LayerSettingsHeader 
                metadata={metadata}
                index={selectedIndex}
                onRemove={onRemove}
            />

            <ScrollShadow className="flex-1 p-8">
                <LayerConfigRenderer 
                    entry={selectedEntry} 
                    index={selectedIndex} 
                />
            </ScrollShadow>
        </div>
    );
};