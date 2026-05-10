// entities/step/column-split/ui.tsx
"use client";

import { Input, Select, SelectItem, Tabs, Tab, Button } from "@heroui/react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { ColumnSplitLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";

type ColumnSplitConfigProps = LayerConfigProps<ColumnSplitLayerSettings>;
type SplitMode = ColumnSplitLayerSettings["mode"];

export const ColumnSplitConfig = ({ settings, onUpdate, prevContext }: ColumnSplitConfigProps ) => {
    const headers = prevContext?.headers ?? [];

    const availableCols = headers.map(( h, i ) => ({
        label: h || `Колонка ${ i + 1 }`,
        value: String( i ),
    }));

    const names = settings.newNames || [ "", "" ];

    const handleNameChange = ( nameIdx: number, val: string ) => {
        const next = [ ...names ];
        next[nameIdx] = val;
        onUpdate?.({ newNames: next });
    };

    // Общие стили для контроллов
    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-1",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white",
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. ВЫБОР КОЛОНКИ */ }

            <div className="space-y-1.5">
                <label className={ controlClassNames.label }>1. Целевая колонка</label>

                <Select
                    classNames={{
                        trigger: "h-8 min-h-8 border-slate-200 bg-white",
                        value: "text-xs font-bold text-slate-700",
                    }}
                    placeholder="Выберите колонку"
                    radius="sm"
                    selectedKeys={ settings.sourceColIndex !== undefined ? [ String( settings.sourceColIndex ) ] : [] }
                    size="sm"
                    variant="bordered"
                    onSelectionChange={ ( keys ) => {
                        const val = Array.from( keys )[0];
                        onUpdate?.({ sourceColIndex: Number( val ) });
                    } }
                >
                    { availableCols.map(( col ) => (
                        <SelectItem key={ col.value } className="text-xs">{ col.label }</SelectItem>
                    )) }
                </Select>
            </div>

            { /* 2. ЛОГИКА РАЗДЕЛЕНИЯ */ }

            <div className="space-y-3">
                <label className={ controlClassNames.label }>2. Метод и правила</label>

                <Tabs
                    fullWidth
                    classNames={{
                        tabList: "p-0 h-8 border-b border-slate-100",
                        cursor: "bg-primary",
                        tab: "h-8 px-2",
                        tabContent: "text-[11px] font-bold uppercase tracking-tight group-data-[selected=true]:text-primary",
                    }}
                    selectedKey={ settings.mode || "delimiter" }
                    size="sm"
                    variant="underlined"
                    onSelectionChange={ ( key ) => onUpdate?.({ mode: key as SplitMode }) }
                >
                    <Tab key="delimiter" title="Символ" />
                    <Tab key="regex" title="Regex" />
                </Tabs>

                { settings.mode === "regex"
                    ? (
                        <Input
                            classNames={ controlClassNames }
                            placeholder="Паттерн: (.*?)\s*-\s*(.*)"
                            radius="sm"
                            size="sm"
                            value={ settings.pattern || "" }
                            variant="bordered"
                            onValueChange={ ( val ) => onUpdate?.({ pattern: val }) }
                        />
                    )
                    : (
                        <Input
                            classNames={ controlClassNames }
                            placeholder="Например: / или ,"
                            radius="sm"
                            size="sm"
                            value={ settings.delimiter || "" }
                            variant="bordered"
                            onValueChange={ ( val ) => onUpdate?.({ delimiter: val }) }
                        />
                    ) }
            </div>

            { /* 3. НОВЫЕ КОЛОНКИ */ }

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className={ controlClassNames.label }>3. Результирующие колонки</label>

                    <Button
                        isIconOnly
                        className="w-5 h-5 min-w-0 bg-slate-100 text-slate-600 hover:bg-primary hover:text-white"
                        radius="full"
                        size="sm"
                        onPress={ () => onUpdate?.({ newNames: [ ...names, "" ] }) }
                    >
                        <Plus size={ 12 } />
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    { names.map(( name: string, i: number ) => (
                        <div key={ i } className="flex gap-1.5 items-center group">
                            <div className="w-5 h-8 flex items-center justify-center text-[9px] font-mono font-black text-slate-500 bg-slate-50 border border-slate-100 rounded">
                                #{ i + 1 }
                            </div>

                            <Input
                                className="flex-1"
                                classNames={ controlClassNames }
                                placeholder="Имя колонки"
                                radius="sm"
                                size="sm"
                                value={ name }
                                variant="bordered"
                                onValueChange={ ( val ) => handleNameChange( i, val ) }
                            />

                            { names.length > 2 && (
                                <Button
                                    isIconOnly
                                    color="danger"
                                    size="sm"
                                    variant="light"
                                    onPress={ () => onUpdate?.({ newNames: names.filter(( _, idx ) => idx !== i ) }) }
                                >
                                    <Trash2 size={ 12 } />
                                </Button>
                            ) }
                        </div>
                    )) }
                </div>
            </div>

            { /* ПОДСКАЗКА */ }

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Оригинальная колонка будет удалена, а на её место встанут новые данные.
                </p>
            </div>
        </div>
    );
};
