import { ScrollShadow, Spinner } from "@heroui/react";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { EmptyLayerState } from "./EmptyLayerState";
import { LayerSettingsHeader } from "./LayerSettingsHeader";
import { LayerConfigRenderer } from "./LayerConfigRenderer";
import { usePatternStore } from "@/entities/pattern/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useExtractionParams } from "@/features/run-extraction/lib/useExtractionParams";
import { useEffect, useMemo } from "react";
import { createInitialContext } from "@/features/run-extraction/lib/context-builder";

interface LayerSettingsPanelProps {
    selectedEntry: PipelineLayer | null;
    selectedIndex: number | null;
}

export const LayerSettingsPanel = ({ selectedEntry, selectedIndex }: LayerSettingsPanelProps) => {
    const pipeline = usePatternStore(s => s.pipeline);
    const params = useExtractionParams();
    const cache = usePreviewStore(s => s.cache);
    const isExecuting = usePreviewStore(s => s.isExecuting);
    const runUpToLayer = usePreviewStore(s => s.runUpToLayer);

    useEffect(() => {
        if (selectedIndex !== null && selectedIndex > 0 && params) {
            const prevLayerId = pipeline[selectedIndex - 1].instanceId;
            if (!cache[prevLayerId]) {
                runUpToLayer(prevLayerId, pipeline, params);
            }
        }
    }, [selectedIndex, pipeline, params, cache, runUpToLayer]);

    const prevContext = useMemo(() => {
        if (!selectedEntry || selectedIndex === null || !params) return undefined;
        if (selectedIndex === 0) return createInitialContext(params);
        
        const prevLayerId = pipeline[selectedIndex - 1].instanceId;
        return cache[prevLayerId];
    }, [selectedEntry, selectedIndex, params, pipeline, cache]);

    if (!selectedEntry || selectedIndex === null) {
        return <EmptyLayerState />;
    }

    const metadata = LAYER_REGISTRY[selectedEntry.id];

    return (
        <div className="flex flex-col h-full bg-white">
            <LayerSettingsHeader 
                metadata={metadata}
            />

            <ScrollShadow className="flex-1 p-8">
                {isExecuting && selectedIndex > 0 && !prevContext ? (
                    <div className="flex items-center justify-center h-48 text-default-400 gap-3">
                        <Spinner size="sm" />
                        <span className="text-sm">Вычисляем контекст...</span>
                    </div>
                ) : (
                    <LayerConfigRenderer 
                        entry={selectedEntry} 
                        index={selectedIndex} 
                        prevContext={prevContext}
                    />
                )}
            </ScrollShadow>
        </div>
    );
};