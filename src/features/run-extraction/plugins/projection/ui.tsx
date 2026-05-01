"use client";

import { Checkbox, Input, Card, Tabs, Tab, ScrollShadow, Divider } from "@heroui/react";
import { ProjectionLayerSettings, ProjectionColumn } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

export const ProjectionConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<ProjectionLayerSettings>) => {
    const inputHeaders = prevContext?.headers ?? [];
    const currentColumns = settings?.columns ?? [];

    const handleModeChange = (mode: string) => {
        onUpdate?.({ mode: mode as 'auto' | 'manual' });
    };

    const toggleColumn = (idx: number) => {
        const isSelected = currentColumns.some(c => c.index === idx);
        let nextColumns: ProjectionColumn[];

        if (isSelected) {
            nextColumns = currentColumns.filter(c => c.index !== idx);
        } else {
            nextColumns = [...currentColumns, { index: idx }].sort((a, b) => a.index - b.index);
        }
        onUpdate?.({ columns: nextColumns });
    };

    const updateName = (idx: number, name: string) => {
        const nextColumns = currentColumns.map(c => 
            c.index === idx ? { ...c, name } : c
        );
        onUpdate?.({ columns: nextColumns });
    };

    return (
        <div className="flex flex-col gap-6">
            <Tabs 
                fullWidth 
                selectedKey={settings.mode} 
                onSelectionChange={(k) => handleModeChange(k as string)}
            >
                <Tab key="auto" title="Автоматически" />
                <Tab key="manual" title="Ручной выбор" />
            </Tabs>

            {settings.mode === 'auto' ? (
                <div className="flex flex-col gap-4">
                    <div className="bg-default-50 p-4 rounded-xl border border-default-100">
                        <p className="text-[11px] text-default-500 mb-4">
                            Укажите номер строки, которая содержит заголовки. 
                            Система автоматически выберет все непустые колонки в этой строке.
                        </p>
                        <Input
                            type="number"
                            label="Индекс строки заголовка"
                            placeholder="0"
                            value={String(settings.headerRowIndex)}
                            onValueChange={(v) => onUpdate?.({ headerRowIndex: Number(v) })}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <p className="text-xs text-default-500">
                        Отметьте колонки, которые должны попасть в финальный результат.
                    </p>
                    <div className="flex flex-col gap-2">
                        {inputHeaders.map((header, idx) => {
                            const columnSetting = currentColumns.find(c => c.index === idx);
                            const isSelected = !!columnSetting;

                            return (
                                <Card 
                                    key={idx} 
                                    shadow="none" 
                                    className={`border transition-all ${isSelected ? 'border-primary bg-primary-50/20' : 'border-default-100'}`}
                                >
                                    <div className="p-3 flex flex-col gap-2">
                                        <Checkbox 
                                            isSelected={isSelected} 
                                            onValueChange={() => toggleColumn(idx)}
                                        >
                                            <span className="text-[10px] font-mono text-default-400">#{idx}</span>
                                            <span className="ml-2 text-sm font-medium">{header}</span>
                                        </Checkbox>
                                        
                                        {isSelected && (
                                            <Input
                                                size="sm"
                                                variant="bordered"
                                                labelPlacement="outside"
                                                placeholder="Название колонки..."
                                                value={columnSetting.name || ""}
                                                onValueChange={(val) => updateName(idx, val)}
                                                className="mt-1"
                                            />
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};