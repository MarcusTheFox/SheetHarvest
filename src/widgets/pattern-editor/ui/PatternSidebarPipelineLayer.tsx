import { usePatternStore } from "@/entities/pattern/model/store";
import { usePreviewStore } from "@/entities/preview/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { LAYER_REGISTRY } from "@/entities/plugins/registry";
import { useSelectedLayerStore } from "@/widgets/spreadsheet-view/model/useSelectedLayerStore";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import clsx from "clsx";
import { ArrowDown, ArrowUp, CheckCircle2, Play, Trash2 } from "lucide-react";

interface PatternSidebarPipelineLayerProps {
    index: number;
    name: string;
    description?: string;
    layerId: string;
    instanceId: string;
    isFirst?: boolean;
    isLast?: boolean;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onRemove?: () => void;
}

export const PatternSidebarPipelineLayer = ( props: PatternSidebarPipelineLayerProps ) => {
    const {
        index,
        layerId,
        instanceId,
        isFirst,
        isLast,
        onMoveUp,
        onMoveDown,
        onRemove,
    } = props;

    const isCached = usePreviewStore(( s ) => !!s.cache[instanceId]);
    const isActive = usePreviewStore(( s ) => s.activePreviewId === instanceId );
    const isExecuting = usePreviewStore(( s ) => s.executingLayerId === instanceId );

    const isLoading = usePreviewStore(( s ) =>
        s.isExecuting
        && s.executingIndex <= index
        && s.targetIndex >= index );

    const metadata = LAYER_REGISTRY[layerId];

    const runUpToLayer = usePreviewStore(( s ) => s.runUpToLayer );
    const setActivePreview = usePreviewStore(( s ) => s.setActivePreview );
    const setSelectedLayerIndex = useSelectedLayerStore(( s ) => s.setSelectedLayerIndex );

    const handleRun = () => {
        const pipeline = usePatternStore.getState().pipeline;
        const sourceTables = useSpreadsheetStore.getState().sourceTables;
        runUpToLayer( instanceId, pipeline, sourceTables );
    };

    const handleSelect = () => {
        setActivePreview( instanceId );
        setSelectedLayerIndex( index );
    };

    const color = isExecuting
        ? "primary"
        : isCached
            ? "success"
            : "default";

    const variant = isCached || isExecuting
        ? "flat"
        : "solid";

    const Icon = isCached
        ? <CheckCircle2 size={ 16 } />
        : <Play className="ml-0.5" size={ 14 } />;

    return (
        <Card className={ clsx(
            "border bg-default-50/50 overflow-hidden shrink-0",
            isActive ? "border-primary" : "border-default-100",
        ) }
        shadow="none"
        >
            <CardBody className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="shrink-0">
                        <Button
                            isIconOnly
                            color={ color }
                            isLoading={ isLoading }
                            radius="full"
                            size="sm"
                            variant={ variant }
                            onPress={ handleRun }
                        >
                            { Icon }
                        </Button>
                    </div>

                    <div
                        className="flex flex-col gap-0.5 min-w-0 flex-1 cursor-pointer group"
                        onClick={ handleSelect }
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-default-400 font-mono">#{ index + 1 }</span>
                            <span className="text-[12px] font-semibold truncate leading-tight group-hover:text-primary transition-colors">{ metadata.name }</span>
                        </div>

                        <span className="text-[10px] text-default-500 line-clamp-1 italic">{ metadata.description }</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <div className="flex flex-col">
                            <Button
                                isIconOnly
                                className="h-5 w-5 min-w-0"
                                isDisabled={ isFirst }
                                size="sm"
                                variant="light"
                                onPress={ onMoveUp }
                            >
                                <ArrowUp size={ 12 } />
                            </Button>

                            <Button
                                isIconOnly
                                className="h-5 w-5 min-w-0"
                                isDisabled={ isLast }
                                size="sm"
                                variant="light"
                                onPress={ onMoveDown }
                            >
                                <ArrowDown size={ 12 } />
                            </Button>
                        </div>

                        { !metadata.isSystem && (
                            <Button
                                isIconOnly
                                className="h-7 w-7 min-w-0"
                                color="danger"
                                size="sm"
                                variant="light"
                                onPress={ onRemove }
                            >
                                <Trash2 size={ 14 } />
                            </Button>
                        ) }
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
