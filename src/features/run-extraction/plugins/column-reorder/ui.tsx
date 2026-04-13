"use client";

import { useEffect } from "react";
import { Button, Card } from "@heroui/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ColumnReorderLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type ColumnReorderConfigProps = LayerConfigProps<ColumnReorderLayerSettings>;

export const ColumnReorderConfig = ({ settings, onUpdate, prevContext }: ColumnReorderConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const order = settings?.order ?? [];

    // Инициализируем порядок, если он пустой
    useEffect(() => {
        if (headers.length > 0 && order.length === 0) {
            onUpdate?.({ order: headers.map((_, idx) => idx) });
        }
    }, [headers.length, order.length]);

    const move = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...order];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (targetIndex >= 0 && targetIndex < newOrder.length) {
            [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
            onUpdate?.({ order: newOrder });
        }
    };

    if (headers.length === 0) {
        return (
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl text-[12px] text-warning-700">
                Для изменения порядка колонок необходимо сначала определить их.
            </div>
        );
    }

    // Если в контексте больше колонок, чем в текущем порядке (например, добавили в предыдущем слое)
    const displayOrder = [...order];
    headers.forEach((_, idx) => {
        if (!displayOrder.includes(idx)) {
            displayOrder.push(idx);
        }
    });

    return (
        <div className="flex flex-col gap-6">
            <p className="text-xs text-default-500">
                Используйте стрелки, чтобы изменить порядок следования колонок в итоговой таблице.
            </p>

            <div className="flex flex-col gap-2">
                {displayOrder.map((originalIdx, currentIdx) => (
                    <Card 
                        key={`${originalIdx}-${currentIdx}`} 
                        shadow="none" 
                        className="border border-default-100 bg-default-50/50"
                    >
                        <div className="px-3 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-default-200 flex items-center justify-center text-[10px] font-bold">
                                    {currentIdx + 1}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                        {headers[originalIdx] || `Колонка ${originalIdx + 1}`}
                                    </span>
                                    <span className="text-[10px] text-default-400 font-mono">
                                        ORIGINAL INDEX: {originalIdx}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex gap-1">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    disabled={currentIdx === 0}
                                    onPress={() => move(currentIdx, 'up')}
                                    className={currentIdx === 0 ? "opacity-30" : ""}
                                >
                                    <ArrowUp size={14} />
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    disabled={currentIdx === displayOrder.length - 1}
                                    onPress={() => move(currentIdx, 'down')}
                                    className={currentIdx === displayOrder.length - 1 ? "opacity-30" : ""}
                                >
                                    <ArrowDown size={14} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
