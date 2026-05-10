"use client";

import { useEffect, useMemo } from "react";
import { Button, ScrollShadow } from "@heroui/react";
import { ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";
import { ColumnReorderLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import clsx from "clsx";

type ColumnReorderConfigProps = LayerConfigProps<ColumnReorderLayerSettings>;

export const ColumnReorderConfig = ({ settings, onUpdate, prevContext }: ColumnReorderConfigProps ) => {
    const headers = prevContext?.headers ?? [];
    const order = settings?.order ?? [];

    // Инициализация порядка, если пустой
    useEffect(() => {
        if ( headers.length > 0 && order.length === 0 ) {
            onUpdate?.({ order: headers.map(( _, idx ) => idx ) });
        }
    }, [ onUpdate, headers, order.length ]);

    const move = ( index: number, direction: "up" | "down" ) => {
        const newOrder = [ ...order ];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if ( targetIndex >= 0 && targetIndex < newOrder.length ) {
            [ newOrder[index], newOrder[targetIndex] ] = [ newOrder[targetIndex], newOrder[index] ];
            onUpdate?.({ order: newOrder });
        }
    };
    
    // Собираем актуальный список для отображения
    const displayList = useMemo(() => {
        const list = order.length === headers.length ? order : headers.map((_, i) => i);
        return list.map((originalIdx) => ({
            id: originalIdx,
            name: headers[originalIdx] || originalIdx + 1
        }));
    }, [order, headers]);

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase block tracking-widest",
    };

    if ( headers.length === 0 ) {
        return (
            <div className="p-4 bg-slate-50 border border-slate-100 rounded text-[11px] text-slate-400 italic">
                Нет данных для сортировки. Сначала настройте колонки.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <label className={ controlClassNames.label }>Порядок вывода</label>

            <div className="border border-slate-200 rounded overflow-hidden">
                <div className="grid grid-cols-[36px_1fr_60px] items-center gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
                    <span className="text-[9px] font-black text-slate-400 font-mono">#</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Название</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase text-right">Сдвиг</span>
                </div>

                <ScrollShadow className="max-h-120">
                    { displayList.map(( item, index ) => (
                        <div 
                            key={ item.id } 
                            className={clsx(
                                "grid grid-cols-[36px_1fr_60px] items-center gap-2 px-3 py-1 border-b border-slate-100 last:border-0",
                                "bg-white hover:bg-slate-50 transition-colors group"
                            )}
                        >
                            <span className="text-[10px] font-mono font-bold text-slate-300">
                                #{ index + 1 }
                            </span>

                            <span className="text-xs font-bold text-slate-600 truncate">
                                { item.name }
                            </span>

                            <div className="flex justify-end gap-0.5">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className={clsx(
                                        "h-6 w-6 min-w-0 text-slate-300 hover:text-primary",
                                        index === 0 && "invisible"
                                    )}
                                    onPress={ () => move( index, "up" ) }
                                >
                                    <ArrowUp size={ 14 } />
                                </Button>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className={clsx(
                                        "h-6 w-6 min-w-0 text-slate-300 hover:text-primary",
                                        index === displayList.length - 1 && "invisible"
                                    )}
                                    onPress={ () => move( index, "down" ) }
                                >
                                    <ArrowDown size={ 14 } />
                                </Button>
                            </div>
                        </div>
                    )) }
                </ScrollShadow>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <ArrowDownUp className="text-slate-400 shrink-0" size={ 14 } />
                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Перемещайте колонки, чтобы изменить их положение в таблице.
                </p>
            </div>
        </div>
    );
};
