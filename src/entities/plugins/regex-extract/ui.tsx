"use client";

import { Input, Select, SelectItem, Switch } from "@heroui/react";
import { Search, HelpCircle, Hash } from "lucide-react";
import { RegexExtractionLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";

type RegexExtractConfigProps = LayerConfigProps<RegexExtractionLayerSettings>;

export const RegexExtractConfig = ({ settings, onUpdate, prevContext }: RegexExtractConfigProps ) => {
    const headers = prevContext?.headers ?? [];

    const availableCols = headers.map(( h, i ) => ({
        label: h || `Колонка ${ i + 1 }`,
        value: String( i ),
    }));

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white",
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. ВЫБОР КОЛОНКИ */ }
            <div className="space-y-1">
                <label className={ controlClassNames.label }>1. Целевая колонка</label>
                <Select
                    placeholder="Выберите колонку"
                    size="sm"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                        trigger: "h-8 min-h-8 border-slate-200 bg-white shadow-none",
                        value: "text-xs font-bold text-slate-700",
                    }}
                    selectedKeys={ settings.sourceColIndex !== undefined ? [ String( settings.sourceColIndex ) ] : [] }
                    onSelectionChange={ ( keys ) => {
                        const val = Array.from( keys )[0];
                        onUpdate?.({ sourceColIndex: Number( val ) });
                    } }
                >
                    { availableCols.map(( col ) => (
                        <SelectItem key={ col.value } startContent={<Hash size={12} className="text-slate-300"/>}>
                            { col.label }
                        </SelectItem>
                    )) }
                </Select>
            </div>

            { /* 2. ПАТТЕРН */ }
            <div className="space-y-1">
                <label className={ controlClassNames.label }>2. Шаблон извлечения (Regex)</label>
                <Input
                    placeholder="Например: [A-Z]{2}-\d{3}"
                    size="sm"
                    variant="bordered"
                    radius="sm"
                    startContent={ <Search className="text-slate-400" size={ 14 } /> }
                    classNames={ controlClassNames }
                    value={ settings.pattern || "" }
                    onValueChange={ ( val ) => onUpdate?.({ pattern: val }) }
                />
            </div>

            { /* 3. ОПЦИИ */ }
            <div className="space-y-3">
                <label className={ controlClassNames.label }>3. Дополнительно</label>
                
                <div 
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => onUpdate?.({ keepOriginalIfNoMatch: !settings.keepOriginalIfNoMatch })}
                >
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-700">Сохранять оригинал</span>
                        <span className="text-[10px] text-slate-400 leading-tight">Если совпадение не найдено, ячейка не будет очищена</span>
                    </div>

                    <Switch
                        size="sm"
                        isSelected={ settings.keepOriginalIfNoMatch }
                        onValueChange={ ( val ) => onUpdate?.({ keepOriginalIfNoMatch: val }) }
                    />
                </div>
            </div>

            { /* КРАТКОЕ ПОЯСНЕНИЕ */ }
            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />
                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Слой просканирует выбранную колонку и оставит только ту часть текста, которая соответствует регулярному выражению.
                </p>
            </div>
        </div>
    );
};