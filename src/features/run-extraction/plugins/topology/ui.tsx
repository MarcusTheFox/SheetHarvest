"use client";

import { Select, SelectItem, Chip } from "@heroui/react";
import { TopologyLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type TopologyConfigProps = LayerConfigProps<TopologyLayerSettings>;
type TopologyMode = 'any' | 'filled' | 'empty';

const MODE_OPTIONS: { key: TopologyMode; label: string; color: 'default' | 'success' | 'danger' }[] = [
    { key: 'any', label: 'Любое', color: 'default' },
    { key: 'filled', label: 'Заполнено', color: 'success' },
    { key: 'empty', label: 'Пусто', color: 'danger' },
];

export const TopologyConfig = ({ settings, onUpdate, prevContext }: TopologyConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const topology = settings?.topology ?? {};

    const handleModeChange = (colIdx: number, mode: TopologyMode) => {
        const next = { ...topology };
        if (mode === 'any') {
            delete next[colIdx];
        } else {
            next[colIdx] = mode;
        }
        onUpdate?.({ topology: next });
    };

    if (headers.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl text-[12px] text-warning-700">
                    Для настройки топологии необходимо сначала запустить предыдущие слои пайплайна.
                    Выберите этот слой после того, как колонки будут определены.
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-xs text-default-500">
                Настройте требования к заполненности для каждой колонки. Строки, не удовлетворяющие условиям, будут исключены.
            </p>

            <div className="flex flex-col gap-3">
                {headers.map((header, colIdx) => {
                    const currentMode = topology[colIdx] ?? 'any';
                    return (
                        <div key={colIdx} className="flex items-center gap-3 p-3 bg-default-50 rounded-xl border border-default-100">
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium truncate block">{header || `Колонка ${colIdx + 1}`}</span>
                            </div>
                            <div className="flex gap-1.5">
                                {MODE_OPTIONS.map(opt => (
                                    <Chip
                                        key={opt.key}
                                        size="sm"
                                        variant={currentMode === opt.key ? 'solid' : 'flat'}
                                        color={currentMode === opt.key ? opt.color : 'default'}
                                        className="cursor-pointer"
                                        onClick={() => handleModeChange(colIdx, opt.key)}
                                    >
                                        {opt.label}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
