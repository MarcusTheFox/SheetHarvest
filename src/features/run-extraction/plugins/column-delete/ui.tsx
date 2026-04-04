"use client";

import { Checkbox, CheckboxGroup, Card } from "@heroui/react";
import { ColumnDeleteLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type ColumnDeleteConfigProps = LayerConfigProps<ColumnDeleteLayerSettings>;

export const ColumnDeleteConfig = ({ settings, onUpdate, prevContext }: ColumnDeleteConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const selectedIndices = (settings?.columnIndices ?? []).map(String);

    const handleChange = (values: string[]) => {
        onUpdate?.({ columnIndices: values.map(Number) });
    };

    if (headers.length === 0) {
        return (
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl text-[12px] text-warning-700">
                Для удаления колонок необходимо сначала определить их (запустить предыдущие слои).
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <p className="text-xs text-default-500">
                Выберите колонки, которые необходимо удалить из итогового результата.
            </p>

            <CheckboxGroup
                label="Доступные колонки"
                value={selectedIndices}
                onValueChange={handleChange}
                classNames={{
                    wrapper: "gap-2"
                }}
            >
                {headers.map((header, idx) => (
                    <Card 
                        key={idx} 
                        shadow="none" 
                        className={`border transition-colors ${
                            selectedIndices.includes(String(idx)) 
                                ? "border-danger bg-danger-50/30" 
                                : "border-default-100 bg-default-50/50"
                        }`}
                    >
                        <div className="px-4 py-3 flex items-center justify-between">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium">
                                    {header || `Колонка ${idx + 1}`}
                                </span>
                                <span className="text-[10px] text-default-400 font-mono">
                                    INDEX: {idx}
                                </span>
                            </div>
                            <Checkbox value={String(idx)} color="danger" />
                        </div>
                    </Card>
                ))}
            </CheckboxGroup>

            <div className="bg-danger-50 p-4 rounded-xl border border-danger-100 flex items-start gap-3">
                <div className="text-danger-500 mt-0.5 font-bold text-sm">⚠️</div>
                <p className="text-[11px] text-danger-700 leading-relaxed">
                    <b>Внимание</b>: Удаление колонки на этом этапе изменит индексы всех последующих колонок. 
                    Все слои ниже по пайплайну будут видеть уже обновленный набор данных.
                </p>
            </div>
        </div>
    );
};
