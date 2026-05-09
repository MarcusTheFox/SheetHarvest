import { ScrollShadow, Spinner } from "@heroui/react";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { EmptyLayerState } from "./EmptyLayerState";
import { LayerSettingsHeader } from "./LayerSettingsHeader";
import { LayerConfigRenderer } from "./LayerConfigRenderer";
import { useSelectedLayer } from "@/widgets/spreadsheet-view/lib/useSelectedLayer";
import { memo } from "react";

export const LayerSettingsPanel = memo(() => {
    const {
        selectedLayerIndex,
        selectedLayer,
        isExecuting,
        inputContext,
    } = useSelectedLayer();

    if ( selectedLayerIndex === undefined || !selectedLayer ) {
        return <EmptyLayerState />;
    }

    const metadata = LAYER_REGISTRY[selectedLayer.id];

    const isWaitingForContext = isExecuting && selectedLayerIndex > 0 && !inputContext;

    return (
        <div className="flex flex-col h-full bg-white">
            <LayerSettingsHeader
                metadata={ metadata }
            />

            <ScrollShadow className="flex-1 p-8">
                { isWaitingForContext
                    ? (
                        <div className="flex items-center justify-center h-48 text-default-400 gap-3">
                            <Spinner size="sm" />
                            <span className="text-sm">Вычисляем контекст...</span>
                        </div>
                    )
                    : (
                        <LayerConfigRenderer
                            entry={ selectedLayer }
                            index={ selectedLayerIndex }
                            prevContext={ inputContext }
                        />
                    ) }
            </ScrollShadow>
        </div>
    );
});

LayerSettingsPanel.displayName = "LayerSettingsPanel";
