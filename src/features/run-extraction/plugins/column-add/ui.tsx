"use client";

import { Input } from "@heroui/react";
import { ColumnAddLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type ColumnAddConfigProps = LayerConfigProps<ColumnAddLayerSettings>;

export const ColumnAddConfig = ({ settings, onUpdate }: ColumnAddConfigProps) => {
    const handleChange = (field: keyof ColumnAddLayerSettings, val: string) => {
        onUpdate?.({ ...settings, [field]: val });
    };

    return (
        <div className="flex flex-col gap-6">
            <p className="text-xs text-default-500">
                Добавляет новую колонку с фиксированным значением во все строки.
            </p>

            <div className="flex flex-col gap-4">
                <Input
                    label="Название колонки"
                    placeholder="Например: Источник"
                    value={settings.columnName}
                    onValueChange={(v) => handleChange('columnName', v)}
                    variant="bordered"
                />
                
                <Input
                    label="Значение"
                    placeholder="Введите значение для всех строк"
                    value={settings.value}
                    onValueChange={(v) => handleChange('value', v)}
                    variant="bordered"
                />
            </div>

            <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-3">
                <div className="text-primary-500 mt-0.5 font-bold text-sm">ℹ️</div>
                <p className="text-[11px] text-primary-700 leading-relaxed">
                    Новая колонка будет добавлена в конец таблицы. Вы можете изменить её положение, используя слой "Изменение порядка колонок".
                </p>
            </div>
        </div>
    );
};
