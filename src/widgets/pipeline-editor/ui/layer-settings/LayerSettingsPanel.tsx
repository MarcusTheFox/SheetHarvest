import { ScrollShadow, Spinner } from "@heroui/react";
import { LAYER_REGISTRY } from "@/entities/plugins/registry";
import { EmptyLayerState } from "./EmptyLayerState";
import { LayerConfigRenderer } from "./LayerConfigRenderer";
import { useSelectedLayer } from "@/widgets/spreadsheet-view/lib/useSelectedLayer";
import { memo } from "react";

export const LayerSettingsPanel = memo(() => {
    const { selectedLayerIndex, selectedLayer, isExecuting, inputContext } = useSelectedLayer();

    if ( selectedLayerIndex === undefined || !selectedLayer ) {
        return <EmptyLayerState />;
    }

    const metadata = LAYER_REGISTRY[selectedLayer.id];

    return (
        <div className="flex flex-col h-full bg-white">
            { /* Header как в инспекторах свойств */ }

            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter font-mono">
                            Step #{ selectedLayerIndex + 1 }
                        </span>

                        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                            { selectedLayer.id }
                        </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-700 truncate">
                        { metadata.name }
                    </h3>
                </div>
            </div>

            <ScrollShadow className="flex-1">
                <div className="p-4 space-y-6">
                    { isExecuting && !inputContext
                        ? (
                            <div className="py-20 flex flex-col items-center gap-3">
                                <Spinner size="sm" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Processing...</span>
                            </div>
                        )
                        : (
                            <LayerConfigRenderer
                                entry={ selectedLayer }
                                index={ selectedLayerIndex }
                                prevContext={ inputContext }
                            />
                        ) }
                </div>
            </ScrollShadow>
        </div>
    );
});

LayerSettingsPanel.displayName = "LayerSettingsPanel";
