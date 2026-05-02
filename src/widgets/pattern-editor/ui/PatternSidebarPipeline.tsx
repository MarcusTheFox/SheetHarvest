"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { Button, Card, CardBody, ScrollShadow, Chip } from "@heroui/react";
import {
    ArrowDown, ArrowUp, Settings2, Trash2,
    CheckCircle2, Play
} from "lucide-react";
import { memo, useMemo } from "react";
import { SearchSelectPopover } from "@/shared/ui/SearchSelectPopover";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useExtractionSource } from "@/features/run-extraction/lib/useExtractionParams";
import { useShallow } from "zustand/shallow";
import { useSelectedLayerStore } from "@/widgets/spreadsheet-view/model/useSelectedLayerStore";

export const PatternSidebarPipeline = memo(() => {
    const setSelectedLayerIndex = useSelectedLayerStore(s => s.setSelectedLayerIndex);

    const handleOpenEditor = (index: number | null = null) => {
        setSelectedLayerIndex(index ?? undefined);
    };

    const sourceTables = useExtractionSource();

    const { cache, runUpToLayer, activePreviewId, isExecuting } = usePreviewStore(
        useShallow(s => ({
            cache: s.cache,
            runUpToLayer: s.runUpToLayer,
            activePreviewId: s.activePreviewId,
            isExecuting: s.isExecuting,
        }))
    );
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

                        const isCached = !!cache[entry.instanceId];
                        const isActivePreview = activePreviewId === entry.instanceId;

                        return (
                            <Card key={entry.instanceId} shadow="none" className="border border-default-100 bg-default-50/50 overflow-hidden shrink-0">
                                <CardBody className="p-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="shrink-0">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                radius="full"
                                                variant={isCached ? "flat" : "solid"}
                                                color={isActivePreview ? "primary" : isCached ? "success" : "default"}
                                                isLoading={isExecuting && isActivePreview}
                                                onPress={() => runUpToLayer(entry.instanceId, pipeline, { tables: sourceTables })}
                                            >
                                                {isCached ? <CheckCircle2 size={16} /> : <Play size={14} className="ml-0.5" />}
                                            </Button>
                                        </div>

                                        <div
                                            className="flex flex-col gap-0.5 min-w-0 flex-1 cursor-pointer group"
                                            onClick={() => handleOpenEditor(index)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-default-400 font-mono">#{index + 1}</span>
                                                <span className="text-[12px] font-semibold truncate leading-tight group-hover:text-primary transition-colors">{metadata.name}</span>
                                            </div>
                                            <span className="text-[10px] text-default-500 line-clamp-1 italic">{metadata.description}</span>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0">
                                            <div className="flex flex-col">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    className="h-5 w-5 min-w-0"
                                                    isDisabled={index === 0}
                                                    onPress={() => moveLayer(index, index - 1)}
                                                >
                                                    <ArrowUp size={12} />
                                                </Button>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    className="h-5 w-5 min-w-0"
                                                    isDisabled={index === pipeline.length - 1}
                                                    onPress={() => moveLayer(index, index + 1)}
                                                >
                                                    <ArrowDown size={12} />
                                                </Button>
                                            </div>

                                            {!metadata.isSystem && (
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    className="h-7 w-7 min-w-0"
                                                    onPress={() => removeLayer(index)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
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
});

PatternSidebarPipeline.displayName = "PatternSidebarPipeline";
