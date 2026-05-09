import { usePatternStore } from "@/entities/pattern/model/store";
import { useSelectedLayerStore } from "../model/useSelectedLayerStore";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useShallow } from "zustand/shallow";
import { createInitialContext } from "@/entities/pattern/lib/context-builder";
import { useEffect, useMemo } from "react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";

export const useSelectedLayer = () => {
    const selectedLayerIndex = useSelectedLayerStore(( s ) => s.selectedLayerIndex );
    const pipeline = usePatternStore(( s ) => s.pipeline );
    const sourceTables = useSpreadsheetStore(( s ) => s.sourceTables );

    const { isExecuting, runUpToLayer } = usePreviewStore(
        useShallow(( s ) => ({
            isExecuting: s.isExecuting,
            runUpToLayer: s.runUpToLayer,
        })),
    );

    const selectedLayer = selectedLayerIndex !== undefined ? pipeline[selectedLayerIndex] : undefined;
    const prevLayerId = ( selectedLayerIndex !== undefined && selectedLayerIndex > 0 )
        ? pipeline[selectedLayerIndex - 1]?.instanceId
        : undefined;

    const inputContextFromCache = usePreviewStore(( s ) => ( prevLayerId ? s.cache[prevLayerId] : undefined ));
    const outputContext = usePreviewStore(( s ) => ( selectedLayer ? s.cache[selectedLayer.instanceId] : undefined ));

    useEffect(() => {
        if ( selectedLayerIndex !== undefined && selectedLayerIndex > 0 && sourceTables && !isExecuting ) {
            if ( prevLayerId && !inputContextFromCache ) {
                runUpToLayer( prevLayerId, pipeline, sourceTables );
            }
        }
    }, [ selectedLayerIndex, prevLayerId, inputContextFromCache, isExecuting ]);

    const inputContext = useMemo(() => {
        if ( !sourceTables ) return undefined;
        if ( !selectedLayerIndex || selectedLayerIndex === 0 ) {
            return createInitialContext( sourceTables );
        }
        return inputContextFromCache;
    }, [ sourceTables, selectedLayerIndex, inputContextFromCache ]);

    return {
        selectedLayerIndex,
        selectedLayer,
        isExecuting,
        inputContext,
        outputContext,
    };
};
