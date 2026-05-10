"use client";

import { Checkbox, Input, Tabs, Tab, ScrollShadow } from "@heroui/react";
import { ProjectionLayerSettings, ProjectionColumn } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { HelpCircle, Columns } from "lucide-react";
import clsx from "clsx";

export const ProjectionConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<ProjectionLayerSettings> ) => {
    const inputHeaders = prevContext?.headers ?? [];
    const currentColumns = settings?.columns ?? [];

    const handleModeChange = ( mode: string ) => {
        onUpdate?.({ mode: mode as "auto" | "manual" });
    };

    const toggleColumn = ( idx: number ) => {
        const isSelected = currentColumns.some(( c ) => c.index === idx );
        let nextColumns: ProjectionColumn[];

        if ( isSelected ) {
            nextColumns = currentColumns.filter(( c ) => c.index !== idx );
        }
        else {
            nextColumns = [ ...currentColumns, { index: idx, name: "" } ].sort(( a, b ) => a.index - b.index );
        }
        onUpdate?.({ columns: nextColumns });
    };

    const updateName = ( idx: number, name: string ) => {
        const nextColumns = currentColumns.map(( c ) =>
            ( c.index === idx ? { ...c, name } : c ));
        onUpdate?.({ columns: nextColumns });
    };

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-7 min-h-7 border-slate-200 bg-white shadow-none",
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. РЕЖИМ ОПРЕДЕЛЕНИЯ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>1. Метод выбора</label>

                <Tabs
                    fullWidth
                    classNames={{
                        tabList: "p-0 h-8 border-b border-slate-100",
                        cursor: "bg-primary",
                        tab: "h-8 px-2",
                        tabContent: "text-[11px] font-bold uppercase tracking-tight group-data-[selected=true]:text-primary",
                    }}
                    selectedKey={ settings.mode }
                    size="sm"
                    variant="underlined"
                    onSelectionChange={ ( k ) => handleModeChange( k as string ) }
                >
                    <Tab key="auto" title="Автоматически" />
                    <Tab key="manual" title="Вручную" />
                </Tabs>
            </div>

            { /* 2. КОНФИГУРАЦИЯ */ }

            { settings.mode === "auto"
                ? (
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className={ controlClassNames.label }>2. Строка с заголовками</label>

                            <Input
                                classNames={ controlClassNames }
                                placeholder="Напр: 1"
                                radius="sm"
                                size="sm"
                                type="number"
                                value={ String( settings.headerRowIndex ) }
                                variant="bordered"
                                onValueChange={ ( v ) => onUpdate?.({ headerRowIndex: Number( v ) }) }
                            />
                        </div>

                        <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                            <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />

                            <p className="text-[10px] text-slate-500 leading-normal italic">
                                Система просканирует указанную строку и выберет все заполненные колонки.
                            </p>
                        </div>
                    </div>
                )
                : (
                    <div className="space-y-3">
                        <label className={ controlClassNames.label }>2. Структура колонок</label>

                        <div className="border border-slate-200 rounded overflow-hidden">
                            { /* Header */ }

                            <div className="grid grid-cols-[36px_1fr_40px] items-center gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
                                <span className="text-[9px] font-black text-slate-400 font-mono">ID</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase">Название / Псевдоним</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase text-right">Вкл</span>
                            </div>

                            { /* List */ }

                            <ScrollShadow className="max-h-[440px]" offset={ 1 }>
                                { inputHeaders.map(( header, idx ) => {
                                    const columnSetting = currentColumns.find(( c ) => c.index === idx );
                                    const isSelected = !!columnSetting;

                                    return (
                                        <div
                                            key={ idx }
                                            className={ clsx(
                                                "grid grid-cols-[36px_1fr_40px] items-center gap-2 px-3 py-1.5 border-b border-slate-100 last:border-0 transition-colors cursor-pointer",
                                                isSelected ? "bg-primary-50/20" : "bg-white hover:bg-slate-50",
                                            ) }
                                            onClick={ () => toggleColumn( idx ) }
                                        >
                                            <span className="text-[10px] font-mono font-bold text-slate-300">#{ idx }</span>

                                            <div className="flex-1 min-w-0" onClick={ ( e ) => isSelected && e.stopPropagation() }>
                                                { isSelected
                                                    ? (
                                                        <Input
                                                            autoFocus
                                                            classNames={ controlClassNames }
                                                            placeholder={ header || `Колонка ${ idx + 1 }` }
                                                            radius="sm"
                                                            size="sm"
                                                            value={ columnSetting.name || "" }
                                                            variant="bordered"
                                                            onValueChange={ ( val ) => updateName( idx, val ) }
                                                        />
                                                    )
                                                    : (
                                                        <span className="text-xs font-bold text-slate-500 truncate block px-1">
                                                            { header || <span className="italic font-normal opacity-40">Без названия</span> }
                                                        </span>
                                                    ) }
                                            </div>

                                            <div className="flex justify-end">
                                                <Checkbox
                                                    isSelected={ isSelected }
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
                ) }

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2 mt-2">
                <Columns className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Выбранные колонки сформируют итоговую таблицу. Порядок можно изменить в следующем слое.
                </p>
            </div>
        </div>
    );
};
