"use client";

import { Input } from "@heroui/react";
import { ColumnAddLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { Info } from "lucide-react";

type ColumnAddConfigProps = LayerConfigProps<ColumnAddLayerSettings>;

export const ColumnAddConfig = ({ settings, onUpdate }: ColumnAddConfigProps ) => {
    const handleChange = ( field: keyof ColumnAddLayerSettings, val: string ) => {
        onUpdate?.({ ...settings, [field]: val });
    };

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white",
    };

    return (
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="space-y-1">
                <label className={ controlClassNames.label }>1. Название колонки</label>
                <Input
                    placeholder="Название"
                    size="sm"
                    variant="bordered"
                    radius="sm"
                    classNames={ controlClassNames }
                    value={ settings.columnName }
                    onValueChange={ ( v ) => handleChange( "columnName", v ) }
                />
            </div>

            <div className="space-y-1">
                <label className={ controlClassNames.label }>2. Фиксированное значение</label>
                <Input
                    placeholder="Текст"
                    size="sm"
                    variant="bordered"
                    radius="sm"
                    classNames={ controlClassNames }
                    value={ settings.value }
                    onValueChange={ ( v ) => handleChange( "value", v ) }
                />
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2.5 mt-2">
                <Info className="text-slate-400 shrink-0" size={ 14 } />
                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Новая колонка будет добавлена в самый конец таблицы. Все строки получат указанное значение.
                </p>
            </div>
        </div>
    );
};