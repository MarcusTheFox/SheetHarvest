"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { Button, Card, CardBody, ScrollShadow, Chip } from "@heroui/react";
import { Settings2, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { SearchSelectPopover } from "@/shared/ui/SearchSelectPopover";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useShallow } from "zustand/shallow";
import { useSelectedLayerStore } from "@/widgets/spreadsheet-view/model/useSelectedLayerStore";
import { PatternSidebarPipelineLayer } from "./PatternSidebarPipelineLayer";
import { useExtractionSource } from "@/features/run-extraction/lib/useExtractionParams";

export const PatternSidebarPipeline = () => {
    const setSelectedLayerIndex = useSelectedLayerStore(s => s.setSelectedLayerIndex);

    const sourceTables = useExtractionSource();

    const preview = usePreviewStore(
        useShallow(s => ({
            cache: s.cache,
            activePreviewId: s.activePreviewId,
            setActivePreview: s.setActivePreview,
            runUpToLayer: s.runUpToLayer,
            executingLayerId: s.executingLayerId,
            isExecuting: s.isExecuting,
            executingIndex: s.executingIndex,
            targetIndex: s.targetIndex,
        }))
    );

    const handleOpenEditor = (index: number | null = null) => {
        setSelectedLayerIndex(index ?? undefined);
    };

    const { pipeline, resetPattern, moveLayer, removeLayer, addLayer } = usePatternStore(
        useShallow(s => ({
            pipeline: s.pipeline,
            resetPattern: s.resetPattern,
            moveLayer: s.moveLayer,
            removeLayer: s.removeLayer,
            addLayer: s.addLayer,
        }))
    );

    const availableLayersFlat = useMemo(() => {
        return Object.values(LAYER_REGISTRY).filter(
            (l) => !pipeline.some(p => p.id === l.id) || !l.isSystem
        ).map(l => ({
            id: l.id,
            name: l.name,
            description: l.description
        }));
    }, [pipeline]);

    const handleClearPipeline = () => {
        handleOpenEditor();
        resetPattern();
    };

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-default-600">
                        <Settings2 size={16} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Функций</span>
                        <Chip size="sm" variant="flat" className="h-5 text-[10px]">{pipeline.length}</Chip>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            size="sm"
                            onPress={handleClearPipeline}
                        >
                            <Trash2 size={16} />
                        </Button>

                        <SearchSelectPopover
                            items={availableLayersFlat}
                            onSelect={addLayer}
                            placeholder="Поиск слоя..."
                            label="Добавить слой"
                        />
                    </div>
                </div>

                <ScrollShadow className="flex flex-col gap-2">
                    <Card shadow="none" radius="sm" className="border border-default-100 bg-default-50/50 overflow-hidden shrink-0">
                        <CardBody className="p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div
                                    className="flex flex-col gap-0.5 min-w-0 flex-1 cursor-pointer group"
                                    onClick={() => handleOpenEditor()}
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
                    {pipeline.map((entry, index) => {
                        const metadata = LAYER_REGISTRY[entry.id];
                        if (!metadata) return null;

                        return (
                            <PatternSidebarPipelineLayer
                                key={entry.instanceId}
                                index={index}
                                name={metadata.name}
                                description={metadata.description}
                                isCached={!!preview.cache[entry.instanceId]}
                                isActive={preview.activePreviewId === entry.instanceId}
                                isExecuting={preview.executingLayerId === entry.instanceId}
                                isLoading={
                                    preview.isExecuting &&
                                    preview.executingIndex <= index &&
                                    preview.targetIndex >= index
                                }
                                isMoveUpDisabled={index === 0}
                                isMoveDownDisabled={index === pipeline.length - 1}
                                isSystem={metadata.isSystem}
                                onLayerPress={() => {
                                    preview.setActivePreview(entry.instanceId);
                                    handleOpenEditor(index)
                                }}
                                onRunLayerPress={() => {
                                    preview.runUpToLayer(entry.instanceId, pipeline, sourceTables);
                                }}
                                onMoveUp={() => moveLayer(index, index - 1)}
                                onMoveDown={() => moveLayer(index, index + 1)}
                                onRemove={() => removeLayer(index)}
                            />
                        );
                    })}

                    {pipeline.length === 0 && (
                        <div className="py-8 border-2 border-dashed border-default-100 rounded-2xl flex flex-col items-center justify-center text-default-400 gap-2">
                            <Settings2 size={24} className="opacity-20" />
                            <span className="text-[11px]">Нет активных слоев</span>
                        </div>
                    )}
                </ScrollShadow>
            </div>
        </>
    );
};

PatternSidebarPipeline.displayName = "PatternSidebarPipeline";
