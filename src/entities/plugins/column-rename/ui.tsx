"use client";

import { Input, ScrollShadow, Button } from "@heroui/react";
import { ColumnRenameLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { Type, RotateCcw } from "lucide-react";
import clsx from "clsx";

type ColumnRenameConfigProps = LayerConfigProps<ColumnRenameLayerSettings>;

export const ColumnRenameConfig = ({ settings, onUpdate, prevContext }: ColumnRenameConfigProps ) => {
    const headers = prevContext?.headers ?? [];
    const renames = settings?.renames ?? {};

    const handleRename = ( idx: number, newName: string ) => {
        onUpdate?.({
            renames: {
                ...renames,
                [idx]: newName,
            },
        });
    };

    const handleReset = ( idx: number ) => {
        const next = { ...renames };
        delete next[idx];
        onUpdate?.({ renames: next });
    };

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-7 min-h-7 border-slate-200 bg-white shadow-none",
    };

    if ( headers.length === 0 ) {
        return (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded text-[11px] text-amber-700 italic">
                Для переименования необходимо сначала определить структуру колонок в предыдущих слоях.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="space-y-3">
                <label className={ controlClassNames.label }>Новые названия колонок</label>
                
                <div className="border border-slate-200 rounded overflow-hidden">
                    { /* Header */ }
                    <div className="grid grid-cols-[30px_1fr_30px] items-center gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
                        <span className="text-[9px] font-black text-slate-500 font-mono">ID</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Оригинал → Новое имя</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase text-right"></span>
                    </div>

                    { /* List */ }
                    <ScrollShadow className="max-h-[440px]">
                        { headers.map(( header, idx ) => {
                            const isRenamed = renames[idx] !== undefined && renames[idx].trim() !== "";

                            return (
                                <div 
                                    key={ idx } 
                                    className={clsx(
                                        "grid grid-cols-[30px_1fr_30px] items-center gap-2 px-3 py-2 border-b border-slate-100 last:border-0 transition-colors group",
                                        isRenamed ? "bg-primary-50/10" : "bg-white"
                                    )}
                                >
                                    <span className="text-[10px] font-mono font-bold text-slate-400">#{ idx }</span>
                                    
                                    <div className="flex-1 min-w-0">
                                        <Input
                                            placeholder={ header || `Колонка ${idx + 1}` }
                                            size="sm"
                                            variant="bordered"
                                            radius="sm"
                                            classNames={ controlClassNames }
                                            value={ renames[idx] || "" }
                                            onValueChange={ ( val ) => handleRename( idx, val ) }
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        { isRenamed && (
                                            <Button
                                                isIconOnly
                                                className="h-6 w-6 min-w-0 text-slate-400 hover:text-blue-500"
                                                variant="light"
                                                onPress={() => handleReset(idx)}
                                            >
                                                <RotateCcw size={ 12 } />
                                            </Button>
                                        ) }
                                    </div>
                                </div>
                            );
                        }) }
                    </ScrollShadow>
                </div>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2 mt-2">
                <Type className="text-slate-400 shrink-0" size={ 14 } />
                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Оставьте поле пустым, чтобы сохранить оригинальное название. Переименование не меняет данные, только заголовки.
                </p>
            </div>
        </div>
    );
};