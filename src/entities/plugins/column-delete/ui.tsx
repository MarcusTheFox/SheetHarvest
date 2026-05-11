"use client";

import { Checkbox, ScrollShadow } from "@heroui/react";
import { ColumnDeleteLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { Trash2, AlertTriangle } from "lucide-react";
import clsx from "clsx";

export const ColumnDeleteConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<ColumnDeleteLayerSettings> ) => {
    const headers = prevContext?.headers ?? [];
    const selectedIndices = settings?.columnIndices ?? [];

    const toggleColumn = ( idx: number ) => {
        const isSelected = selectedIndices.includes( idx );
        let nextIndices: number[];

        if ( isSelected ) {
            nextIndices = selectedIndices.filter(( i ) => i !== idx );
        }
        else {
            nextIndices = [ ...selectedIndices, idx ].sort(( a, b ) => a - b );
        }
        onUpdate?.({ columnIndices: nextIndices });
    };

    const labelStyle = "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest";

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="space-y-3">
                <label className={ labelStyle }>Выберите колонки для удаления</label>

                <div className="border border-slate-200 rounded overflow-hidden">
                    { /* Header */ }

                    <div className="grid grid-cols-[36px_1fr_40px] items-center gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
                        <span className="text-[9px] font-black text-slate-400 font-mono">#</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Название колонки</span>

                        <div className="flex justify-end">
                            <Trash2 className="text-slate-400" size={ 12 } />
                        </div>
                    </div>

                    { /* List */ }

                    <ScrollShadow className="max-h-120">
                        { headers.map(( header, idx ) => {
                            const isDeleted = selectedIndices.includes( idx );

                            return (
                                <div
                                    key={ idx }
                                    className={ clsx(
                                        "grid grid-cols-[36px_1fr_40px] items-center gap-2 px-3 py-2 border-b border-slate-100 last:border-0 transition-all cursor-pointer",
                                        isDeleted ? "bg-danger-50/30" : "bg-white hover:bg-slate-50",
                                    ) }
                                    onClick={ () => toggleColumn( idx ) }
                                >
                                    <span className={ clsx(
                                        "text-[10px] font-mono font-bold transition-colors",
                                        isDeleted ? "text-danger-300" : "text-slate-300",
                                    ) }
                                    >
                                        #{ idx }
                                    </span>

                                    <span className={ clsx(
                                        "text-xs font-bold truncate transition-colors",
                                        isDeleted ? "text-danger-600 line-through" : "text-slate-600",
                                    ) }
                                    >
                                        { header || <span className="italic font-normal opacity-40">Без названия</span> }
                                    </span>

                                    <div className="flex justify-end">
                                        <Checkbox
                                            className="p-0"
                                            color="danger"
                                            isSelected={ isDeleted }
                                            size="sm"
                                            onClick={ ( e ) => e.stopPropagation() }
                                            onValueChange={ () => toggleColumn( idx ) }
                                        />
                                    </div>
                                </div>
                            );
                        }) }
                    </ScrollShadow>
                </div>
            </div>

            { /* ВНИМАНИЕ */ }

            <div className="bg-amber-50 p-3 rounded border border-amber-100 flex gap-2">
                <AlertTriangle className="text-amber-500 shrink-0" size={ 14 } />

                <div className="space-y-1">
                    <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tight">Важное замечание</p>

                    <p className="text-[10px] text-amber-700 leading-normal italic">
                        Удаление колонки изменит индексы всех последующих столбцов для шагов, находящихся ниже в пайплайне.
                    </p>
                </div>
            </div>
        </div>
    );
};
