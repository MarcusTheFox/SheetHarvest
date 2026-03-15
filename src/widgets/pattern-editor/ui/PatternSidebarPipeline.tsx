"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { ArrowDown, ArrowUp, PlusCircle, Settings2, Trash2, ExternalLink, CheckCircle2, Play } from "lucide-react";
import { memo, useState } from "react";
import { PipelineEditor } from "../../pipeline-editor/ui/PipelineEditor";
import { useRunExtraction } from "@/features/run-extraction/lib/useRunExtraction";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useExtractionParams } from "@/features/run-extraction/lib/useExtractionParams";

export const PatternSidebarPipeline = memo(() => {
    const { cache, runUpToLayer, activePreviewId, isExecuting } = usePreviewStore();
    const params = useExtractionParams();
    const { pipeline, moveLayer, removeLayer, addLayer } = usePatternStore();
    const { runExtraction } = useRunExtraction();
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    // Доступные слои — те, которых нет в списке (или которые не системные, если мы разрешим дубли)
    const availableLayers = Object.values(LAYER_REGISTRY).filter(
        (l) => !pipeline.some(p => p.id === l.id) || !l.isSystem
    );

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-default-600">
                        <Settings2 size={16} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Пайплайн</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="primary"
                            title="Открыть редактор"
                            onPress={() => setIsEditorOpen(true)}
                        >
                            <ExternalLink size={16} />
                        </Button>

                        {availableLayers.length > 0 && (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly size="sm" variant="light" color="primary">
                                        <PlusCircle size={18} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Add layer">
                                    {availableLayers.map((layer) => (
                                        <DropdownItem
                                            key={layer.id}
                                            description={layer.description}
                                            onPress={() => addLayer(layer.id)}
                                        >
                                            {layer.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {pipeline.map((entry, index) => {
                        const metadata = LAYER_REGISTRY[entry.id];
                        if (!metadata) return null;

                        const isCached = !!cache[entry.instanceId];
                        const isActivePreview = activePreviewId === entry.instanceId;

                        return (
                            <Card key={entry.instanceId} shadow="none" className="border border-default-100 bg-default-50/50 overflow-hidden">
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
                                                onPress={() => {
                                                    if (params) runUpToLayer(entry.instanceId, pipeline, params);
                                                }}
                                            >
                                                {isCached ? <CheckCircle2 size={16} /> : <Play size={14} className="ml-0.5" />}
                                            </Button>
                                        </div>

                                        <div className="flex flex-col gap-0.5 min-w-0 flex-1 cursor-pointer" onClick={() => {
                                            if(isCached) usePreviewStore.getState().setActivePreview(entry.instanceId);
                                        }}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-default-400 font-mono">#{index + 1}</span>
                                                <span className="text-[12px] font-semibold truncate leading-tight">{metadata.name}</span>
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
                </div>
            </div>

            <PipelineEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onApply={runExtraction}
            />
        </>
    );
});

PatternSidebarPipeline.displayName = "PatternSidebarPipeline";
