"use client";

import { Input, Select, SelectItem, Switch } from "@heroui/react";
import { AnchorLayerSettings, AnchorPoint } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { useMemo } from "react";
import { HelpCircle, Combine } from "lucide-react";

type AnchorConfigProps = LayerConfigProps<AnchorLayerSettings>;

const controlClassNames = {
    label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
    input: "text-xs font-bold text-slate-700",
    inputWrapper: "h-8 min-h-8 border-slate-200 bg-white shadow-none",
};

const AnchorPointEditor = ({
    point,
    columns,
    onChange,
}: {
    point: AnchorPoint | null;
    columns: { label: string; value: string }[];
    onChange: ( point: AnchorPoint | null ) => void;
}) => {
    return (
        <div className="space-y-2">
            <Select
                classNames={{
                    trigger: "h-8 min-h-8 border-slate-200 bg-white",
                    value: "text-xs font-bold text-slate-700",
                }}
                labelPlacement="outside"
                placeholder="Выберите колонку"
                radius="sm"
                selectedKeys={ point?.colIndex !== undefined ? [ String( point.colIndex ) ] : [] }
                size="sm"
                variant="bordered"
                onSelectionChange={ ( keys ) => {
                    const val = Array.from( keys )[0];
                    if ( val !== undefined ) onChange({ text: point?.text ?? "", colIndex: Number( val ) });
                    else onChange( null );
                } }
            >
                { columns.map(( col ) => (
                    <SelectItem key={ col.value } className="text-xs">{ col.label }</SelectItem>
                )) }
            </Select>

            <Input
                classNames={ controlClassNames }
                placeholder="Текст для поиска..."
                radius="sm"
                size="sm"
                value={ point?.text ?? "" }
                variant="bordered"
                onValueChange={ ( text ) => onChange({ colIndex: point?.colIndex ?? 0, text }) }
            />
        </div>
    );
};

export const AnchorConfig = ({ settings, onUpdate, prevContext }: AnchorConfigProps ) => {
    const headers = useMemo(() => prevContext?.headers ?? [], [ prevContext ]);

    const columns = useMemo(() => {
        return headers.map(( h, i ) => ({
            label: h || `Колонка ${ i + 1 }`,
            value: String( i ),
        }));
    }, [ headers ]);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. СТАРТ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>1. Начало диапазона</label>

                <AnchorPointEditor
                    columns={ columns }
                    point={ settings?.start ?? null }
                    onChange={ ( start ) => onUpdate?.({ start }) }
                />
            </div>

            { /* 2. КОНЕЦ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>2. Конец диапазона</label>

                <AnchorPointEditor
                    columns={ columns }
                    point={ settings?.end ?? null }
                    onChange={ ( end ) => onUpdate?.({ end }) }
                />
            </div>

            { /* 3. ОПЦИИ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>3. Параметры вывода</label>

                <div
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => onUpdate?.({ mergeResults: !settings.mergeResults })}
                >
                    <div className="flex items-center gap-2">
                        <Combine className="text-slate-400" size={ 14 } />
                        <span className="text-xs font-bold text-slate-600">Склеить результаты</span>
                    </div>

                    <Switch
                        isSelected={ settings?.mergeResults ?? false }
                        size="sm"
                        onValueChange={ ( val ) => onUpdate?.({ mergeResults: val }) }
                    />
                </div>
            </div>

            { /* ПОДСКАЗКА */ }

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Данные будут захвачены от строки после «Старта» до строки перед «Концом».
                    Если текст не найден, якорь игнорируется.
                </p>
            </div>
        </div>
    );
};
