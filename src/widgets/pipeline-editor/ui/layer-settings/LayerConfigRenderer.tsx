import { PipelineLayer } from "@/entities/pattern/model/types";
import { LAYER_REGISTRY } from "@/entities/plugins/registry";
import { usePatternStore } from "@/entities/pattern/model/store";
import { PipelineContext } from "@/shared/types/pipeline";

interface LayerConfigRendererProps {
    entry: PipelineLayer;
    index: number;
    prevContext?: PipelineContext;
}

export const LayerConfigRenderer = ({ entry, index, prevContext }: LayerConfigRendererProps ) => {
    const updateLayerSettings = usePatternStore(( s ) => s.updateLayerSettings );
    const metadata = LAYER_REGISTRY[entry.id];
    const ConfigComponent = metadata?.component;

    return (
        <div className="space-y-6">
            <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-4">
                    Конфигурация
                </label>

                { ConfigComponent
                    ? (
                        <ConfigComponent
                            prevContext={ prevContext }
                            settings={ entry.settings }
                            onUpdate={ ( settings ) => updateLayerSettings( index, settings ) }
                        />
                    )
                    : (
                        <div className="py-8 px-4 border-2 border-dashed border-slate-100 rounded-lg text-center">
                            <span className="text-xs text-slate-400 italic">Нет доступных настроек</span>
                        </div>
                    ) }
            </div>

            { /* Описание внизу, как подсказка */ }

            <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    { metadata.description }
                </p>
            </div>
        </div>
    );
};
