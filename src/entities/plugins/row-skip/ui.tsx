"use client";

import { Input } from "@heroui/react";
import { RowSkipLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { HelpCircle, ArrowDownToLine } from "lucide-react";

type RowSkipConfigProps = LayerConfigProps<RowSkipLayerSettings>;

export const RowSkipConfig = ({ settings, onUpdate }: RowSkipConfigProps ) => {
    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white",
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. ПАРАМЕТРЫ */ }

            <div className="space-y-1.5">
                <label className={ controlClassNames.label }>
                    1. Правила пропуска
                </label>

                <Input
                    classNames={ controlClassNames }
                    min={ 0 }
                    placeholder="Введите количество..."
                    radius="sm"
                    size="sm"
                    startContent={ <ArrowDownToLine className="text-slate-400" size={ 14 } /> }
                    type="number"
                    value={ String( settings.skipCount ?? 1 ) }
                    variant="bordered"
                    onValueChange={ ( val ) => {
                        const num = parseInt( val );
                        if ( !isNaN( num ) && num >= 0 ) {
                            onUpdate?.({ skipCount: num });
                        }
                    } }
                />
            </div>

            { /* ПОДСКАЗКА */ }

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Первые N строк каждой группы будут удалены. Полезно для очистки данных от лишних заголовков внутри таблиц.
                </p>
            </div>
        </div>
    );
};
