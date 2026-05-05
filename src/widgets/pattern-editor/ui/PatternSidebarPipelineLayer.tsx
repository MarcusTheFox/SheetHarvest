import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import clsx from "clsx";
import { ArrowDown, ArrowUp, CheckCircle2, Play, Trash2 } from "lucide-react";

interface PatternSidebarPipelineLayerProps {
    index: number;
    name: string;
    description?: string;

    isSystem?: boolean;
    isActive?: boolean;
    isCached?: boolean;
    isLoading?: boolean;
    isExecuting?: boolean;

    isMoveUpDisabled?: boolean;
    isMoveDownDisabled?: boolean;

    onLayerPress?: () => void;
    onRunLayerPress?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onRemove?: () => void;
}

export const PatternSidebarPipelineLayer = (props: PatternSidebarPipelineLayerProps) => {
    const color = props.isExecuting
        ? "primary" :
        props.isCached
            ? "success"
            : "default";

    const variant = props.isCached || props.isExecuting
        ? "flat"
        : "solid";

    const Icon = props.isCached
        ? <CheckCircle2 size={16} />
        : <Play size={14} className="ml-0.5" />;

    return (
        <Card shadow="none" className={clsx(
            "border bg-default-50/50 overflow-hidden shrink-0",
            props.isActive ? "border-primary" : "border-default-100",
        )}>
            <CardBody className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="shrink-0">
                        <Button
                            isIconOnly
                            size="sm"
                            radius="full"
                            variant={variant}
                            color={color}
                            isLoading={props.isLoading}
                            onPress={props.onRunLayerPress}
                        >
                            {Icon}
                        </Button>
                    </div>

                    <div
                        className="flex flex-col gap-0.5 min-w-0 flex-1 cursor-pointer group"
                        onClick={() => props.onLayerPress?.()}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-default-400 font-mono">#{props.index + 1}</span>
                            <span className="text-[12px] font-semibold truncate leading-tight group-hover:text-primary transition-colors">{props.name}</span>
                        </div>
                        <span className="text-[10px] text-default-500 line-clamp-1 italic">{props.description}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <div className="flex flex-col">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="h-5 w-5 min-w-0"
                                isDisabled={props.isMoveUpDisabled}
                                onPress={() => props.onMoveUp?.()}
                            >
                                <ArrowUp size={12} />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="h-5 w-5 min-w-0"
                                isDisabled={props.isMoveDownDisabled}
                                onPress={() => props.onMoveDown?.()}
                            >
                                <ArrowDown size={12} />
                            </Button>
                        </div>

                        {!props.isSystem && (
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="danger"
                                className="h-7 w-7 min-w-0"
                                onPress={() => props.onRemove?.()}
                            >
                                <Trash2 size={14} />
                            </Button>
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}