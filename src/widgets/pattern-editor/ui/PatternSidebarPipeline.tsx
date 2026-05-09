"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { LAYER_REGISTRY } from "@/entities/plugins/registry";
import { Button, Card, CardBody, ScrollShadow, Chip } from "@heroui/react";
import { Settings2, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { SearchSelectPopover } from "@/shared/ui/SearchSelectPopover";
import { useShallow } from "zustand/shallow";
import { useSelectedLayerStore } from "@/widgets/spreadsheet-view/model/useSelectedLayerStore";
import { PatternSidebarPipelineLayer } from "./PatternSidebarPipelineLayer";
import { usePreviewStore } from "@/entities/preview/model/store";

export const PatternSidebarPipeline = () => {
    const setSelectedLayerIndex = useSelectedLayerStore(( s ) => s.setSelectedLayerIndex );
    const setActivePreview = usePreviewStore(( s ) => s.setActivePreview );

    const pipeline = usePatternStore(( s ) => s.pipeline );

    const pipelineIds = useMemo(() => pipeline.map(( p ) => ({
        instanceId: p.instanceId,
        id: p.id,
    })), [ pipeline ]);

    const handleOpenEditor = ( index: number | null = null ) => {
        setActivePreview( null );
        setSelectedLayerIndex( index ?? undefined );
    };

    const { resetPattern, moveLayer, removeLayer, addLayer } = usePatternStore(
        useShallow(( s ) => ({
            resetPattern: s.resetPattern,
            moveLayer: s.moveLayer,
            removeLayer: s.removeLayer,
            addLayer: s.addLayer,
        })),
    );

    const availableLayersFlat = useMemo(() => {
        return Object.values( LAYER_REGISTRY ).filter(
            ( l ) => !pipelineIds.some(( p ) => p.id === l.id ) || !l.isSystem,
        )
            .map(( l ) => ({
                id: l.id,
                name: l.name,
                description: l.description,
            }));
    }, [ pipelineIds ]);

    const handleClearPipeline = () => {
        handleOpenEditor();
        resetPattern();
    };

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-default-600">
                        <Settings2 size={ 16 } />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Функций</span>
                        <Chip className="h-5 text-[10px]" size="sm" variant="flat">{ pipelineIds.length }</Chip>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            isIconOnly
                            color="danger"
                            size="sm"
                            variant="light"
                            onPress={ handleClearPipeline }
                        >
                            <Trash2 size={ 16 } />
                        </Button>

                        <SearchSelectPopover
                            items={ availableLayersFlat }
                            label="Добавить слой"
                            placeholder="Поиск слоя..."
                            onSelect={ addLayer }
                        />
                    </div>
                </div>

                <ScrollShadow className="flex flex-col gap-2">
                    <Card className="border border-default-100 bg-default-50/50 overflow-hidden shrink-0" radius="sm" shadow="none">
                        <CardBody className="p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div
                                    className="flex flex-col gap-0.5 min-w-0 flex-1 cursor-pointer group"
                                    onClick={ () => handleOpenEditor() }
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-default-400 font-mono">#0</span>
                                        <span className="text-[12px] font-semibold truncate leading-tight group-hover:text-primary transition-colors">Исходные данные</span>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <div className="border-b border-slate-200 h-px" />

                    { pipelineIds.map(( entry, index ) => {
                        const metadata = LAYER_REGISTRY[entry.id];
                        if ( !metadata ) return null;

                        return (
                            <PatternSidebarPipelineLayer
                                key={ entry.instanceId }
                                description={ metadata.description }
                                index={ index }
                                instanceId={ entry.instanceId }
                                isFirst={ index === 0 }
                                isLast={ index === pipelineIds.length - 1 }
                                layerId={ entry.id }
                                name={ metadata.name }
                                onMoveDown={ () => moveLayer( index, index + 1 ) }
                                onMoveUp={ () => moveLayer( index, index - 1 ) }
                                onRemove={ () => removeLayer( index ) }
                            />
                        );
                    }) }

                    { pipelineIds.length === 0 && (
                        <div className="py-8 border-2 border-dashed border-default-100 rounded-2xl flex flex-col items-center justify-center text-default-400 gap-2">
                            <Settings2 className="opacity-20" size={ 24 } />
                            <span className="text-[11px]">Нет активных слоев</span>
                        </div>
                    ) }
                </ScrollShadow>
            </div>
        </>
    );
};

PatternSidebarPipeline.displayName = "PatternSidebarPipeline";
