import { usePatternStore } from "@/entities/pattern/model/store";
import { useSelectedLayerStore } from "../model/useSelectedLayerStore";
import { useExtractionSource } from "@/features/run-extraction/lib/useExtractionParams";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useShallow } from "zustand/shallow";
import { createInitialContext } from "@/features/run-extraction/lib/context-builder";
import { useEffect, useMemo } from "react";

export const useSelectedLayer = () => {
    const selectedLayerIndex = useSelectedLayerStore((s) => s.selectedLayerIndex);
    const pipeline = usePatternStore((s) => s.pipeline);
    const sourceTables = useExtractionSource();

    const { cache, isExecuting, runUpToLayer } = usePreviewStore(
        useShallow(s => ({
            cache: s.cache,
            isExecuting: s.isExecuting,
            runUpToLayer: s.runUpToLayer,
        }))
    )

    useEffect(() => {
        if (selectedLayerIndex !== undefined && selectedLayerIndex > 0 && sourceTables) {
            const previousLayerId = pipeline[selectedLayerIndex - 1]?.instanceId;
            if (previousLayerId && !cache[previousLayerId]) {
                runUpToLayer(previousLayerId, pipeline, { tables: sourceTables });
            }
        }
    }, [selectedLayerIndex, pipeline, sourceTables, cache, runUpToLayer])

    const inputContext = useMemo(() => {
        if (!sourceTables) return undefined;
        if (!selectedLayerIndex || selectedLayerIndex === 0) {
            return createInitialContext(sourceTables);
        }
        const previousLayerId = pipeline[selectedLayerIndex - 1]?.instanceId;
        if (!previousLayerId) return undefined;
        return cache[previousLayerId];
    }, [sourceTables, selectedLayerIndex, pipeline, cache]);

    const selectedLayer = selectedLayerIndex !== undefined ? pipeline[selectedLayerIndex] : undefined;

    const outputContext = selectedLayer ? cache[selectedLayer.instanceId] : undefined;

    return {
        selectedLayerIndex,
        selectedLayer,
        isExecuting,
        inputContext,
        outputContext,
    };
}