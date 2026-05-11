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
    includePoint,
    columns,
    onChange,
    onIncludeChage,
}: {
    point: AnchorPoint | null;
    includePoint: boolean;
    columns: { label: string; value: string }[];
    onChange: ( point: AnchorPoint | null ) => void;
    onIncludeChage: ( include: boolean ) => void;
}) => {

    const toggleRow = ( isSelected: boolean, onToggle: ( v: boolean ) => void ) => (
        <div
            className="flex items-center justify-between px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={ () => onToggle( !isSelected ) }
        >
            <span className="text-xs font-bold text-slate-600">Включить маркер в результат</span>

            <Switch
                isSelected={ isSelected }
                size="sm"
                onValueChange={ onToggle }
            />
        </div>
    );

    return (
        <div className="space-y-2">
            <Select
                classNames={{
                    trigger: "h-8 min-h-8 border-slate-200 bg-white shadow-none",
                    value: "text-xs font-bold text-slate-700",
                }}
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

            { toggleRow( includePoint, ( v ) => onIncludeChage?.( v )) }
        </div>
    );
};

export const AnchorConfig = ({ settings, onUpdate, prevContext }: AnchorConfigProps ) => {
    const headers = useMemo(() => prevContext?.headers ?? [], [ prevContext ]);
    const columns = useMemo(() => headers.map(( h, i ) => ({
        label: h || String( i + 1 ),
        value: String( i ),
    })), [ headers ]);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. СТАРТ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>1. Начало диапазона</label>

                <AnchorPointEditor
                    columns={ columns }
                    includePoint={ !!settings.includeStart }
                    point={ settings?.start ?? null }
                    onChange={ ( start ) => onUpdate?.({ start }) }
                    onIncludeChage={ ( includeStart ) => onUpdate?.({ includeStart }) }
                />
            </div>

            { /* 2. КОНЕЦ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>2. Конец диапазона</label>

                <AnchorPointEditor
                    columns={ columns }
                    includePoint={ !!settings.includeEnd }
                    point={ settings?.end ?? null }
                    onChange={ ( end ) => onUpdate?.({ end }) }
                    onIncludeChage={ ( includeEnd ) => onUpdate?.({ includeEnd }) }
                />
            </div>

            { /* 3. ОПЦИИ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>3. Параметры вывода</label>

                <div
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={ () => onUpdate?.({ mergeResults: !settings.mergeResults }) }
                >
                    <div className="flex items-center gap-2">
                        <Combine className="text-slate-400" size={ 14 } />
                        <span className="text-xs font-bold text-slate-600">Склеить результаты</span>
                    </div>

                    <Switch
                        isSelected={ !!settings.mergeResults }
                        size="sm"
                        onValueChange={ ( val ) => onUpdate?.({ mergeResults: val }) }
                    />
                </div>
            </div>

            { /* ПОДСКАЗКА */ }

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Данные будут захвачены от строки начала диапазона до строки конца диапазона.
                </p>
            </div>
        </div>
    );
};
