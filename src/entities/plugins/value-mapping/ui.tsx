"use client";

import { useEffect, useState, useMemo } from "react";
import { Button, Select, SelectItem, Input, Autocomplete, AutocompleteItem, ScrollShadow } from "@heroui/react";
import { Database, Save, X, Search, Check, AlertCircle, ArrowRight } from "lucide-react";
import { ValueMappingLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { useMappingStore } from "@/entities/value-mapping/model/store";
import { useShallow } from "zustand/shallow";

export const ValueMappingConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<ValueMappingLayerSettings> ) => {
    const { mappings, isLoaded, loadMappings, addMapping, removeMapping } = useMappingStore(
        useShallow(( s ) => ({
            mappings: s.mappings,
            isLoaded: s.isLoaded,
            loadMappings: s.loadMappings,
            addMapping: s.addMapping,
            removeMapping: s.removeMapping,
        })),
    );

    const [ isDbOpen, setIsDbOpen ] = useState( false );
    const [ inputValues, setInputValues ] = useState<Record<string, string>>({});
    const [ filterText, setFilterText ] = useState( "" );

    useEffect(() => { loadMappings(); }, [ loadMappings ]);

    const headers = prevContext?.headers ?? [];
    const tables = prevContext?.tables;

    // Стили для инспектора
    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-7 min-h-7 border-slate-200 bg-white shadow-none",
    };

    const uniqueValuesInCol = useMemo(() => {
        if ( settings.sourceColIndex === undefined || !tables ) return [];
        const vals = new Set<string>();
        tables.forEach(( t ) => t.rows.forEach(( r ) => {
            const val = String( r.cells[settings.sourceColIndex!] || "" ).trim();
            if ( val ) vals.add( val );
        }));
        return Array.from( vals );
    }, [ tables, settings.sourceColIndex ]);

    const unmappedValues = useMemo(() => {
        const lowerMappings = Object.keys( mappings ).map(( k ) => k.toLowerCase());
        return uniqueValuesInCol.filter(( v ) => !lowerMappings.includes( v.toLowerCase()));
    }, [ uniqueValuesInCol, mappings ]);

    const handleSaveMapping = async ( original: string ) => {
        const replacement = inputValues[original]?.trim();
        if ( replacement ) {
            await addMapping( original, replacement );
            setInputValues(( prev ) => { const next = { ...prev }; delete next[original]; return next; });
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. ВЫБОР КОЛОНКИ */ }

            <div className="space-y-1">
                <label className={ controlClassNames.label }>1. Целевая колонка</label>

                <Select
                    classNames={{ trigger: "h-8 min-h-8 border-slate-200 bg-white", value: "text-xs font-bold text-slate-700" }}
                    placeholder="Выберите колонку"
                    radius="sm"
                    selectedKeys={ settings.sourceColIndex !== undefined ? [ String( settings.sourceColIndex ) ] : [] }
                    size="sm"
                    variant="bordered"
                    onSelectionChange={ ( keys ) => onUpdate?.({ sourceColIndex: Number( Array.from( keys )[0]) }) }
                >
                    { headers.map(( h, i ) => (
                        <SelectItem key={ i } className="text-xs">{ h || `Колонка ${ i + 1 }` }</SelectItem>
                    )) }
                </Select>
            </div>

            { settings.sourceColIndex !== undefined && isLoaded && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <label className={ controlClassNames.label + " mb-0!" }>
                            { isDbOpen ? "База сопоставлений" : "Новые значения" }
                        </label>

                        <Button
                            className="h-6 text-[10px] font-bold uppercase text-blue-500"
                            size="sm"
                            startContent={ isDbOpen ? <Check size={ 12 }/> : <Database size={ 12 }/> }
                            variant="light"
                            onPress={ () => setIsDbOpen( !isDbOpen ) }
                        >
                            { isDbOpen ? "К сопоставлению" : `База (${ Object.keys( mappings ).length })` }
                        </Button>
                    </div>

                    { !isDbOpen
                        ? (
                            <div className="space-y-2">
                                { unmappedValues.length === 0
                                    ? (
                                        <div className="py-10 text-center bg-slate-50 rounded border border-dashed border-slate-200">
                                            <Check className="mx-auto text-green-500 mb-2" size={ 20 } />
                                            <p className="text-[11px] text-slate-400 font-bold uppercase">Все значения сопоставлены</p>
                                        </div>
                                    )
                                    : (
                                        <div className="flex flex-col gap-2">
                                            { unmappedValues.map(( val ) => (
                                                <div key={ val } className="flex flex-col gap-1.5 p-2 bg-slate-50 rounded border border-slate-200 transition-all hover:border-slate-300">
                                                    <span className="text-[11px] font-bold text-slate-700 truncate px-1" title={ val }>{ val }</span>

                                                    <div className="flex gap-1">
                                                        <Autocomplete
                                                            allowsCustomValue
                                                            className="flex-1"
                                                            inputProps={{ classNames: { input: "text-[11px] font-bold", inputWrapper: "h-7 min-h-7 bg-white border-slate-200 shadow-none" } }}
                                                            placeholder="Эталонное значение..."
                                                            radius="sm"
                                                            size="sm"
                                                            variant="bordered"
                                                            onInputChange={ ( v ) => setInputValues({ ...inputValues, [val]: v }) }
                                                        >
                                                            { Array.from( new Set( Object.values( mappings ))).map(( rep ) => (
                                                                <AutocompleteItem key={ rep } className="text-xs">{ rep }</AutocompleteItem>
                                                            )) }
                                                        </Autocomplete>

                                                        <Button
                                                            isIconOnly
                                                            className="h-7 w-7 min-w-0 bg-primary text-white"
                                                            isDisabled={ !inputValues[val]?.trim() }
                                                            size="sm"
                                                            onPress={ () => handleSaveMapping( val ) }
                                                        >
                                                            <Save size={ 14 } />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )) }
                                        </div>
                                    ) }
                            </div>
                        )
                        : (
                            <div className="space-y-3">
                                <Input
                                    classNames={{ input: "text-xs font-bold", inputWrapper: "h-8 min-h-8 bg-white border-slate-200 shadow-none" }}
                                    placeholder="Поиск по базе..."
                                    radius="sm"
                                    size="sm"
                                    startContent={ <Search className="text-slate-400" size={ 12 } /> }
                                    value={ filterText }
                                    variant="bordered"
                                    onValueChange={ setFilterText }
                                />

                                <ScrollShadow className="max-h-[300px] pr-2" offset={ 1 }>
                                    <div className="flex flex-col gap-1.5">
                                        { Object.entries( mappings )
                                            .filter(([ k, v ]) => k.toLowerCase().includes( filterText.toLowerCase()) || v.toLowerCase().includes( filterText.toLowerCase()))
                                            .map(([ orig, rep ]) => (
                                                <div key={ orig } className="grid grid-cols-[1fr_12px_1fr_24px] items-center gap-2 p-1.5 bg-white border border-slate-100 rounded group transition-all hover:border-slate-300">
                                                    <span className="text-[10px] font-bold text-slate-500 truncate" title={ orig }>{ orig }</span>
                                                    <ArrowRight className="text-slate-400" size={ 10 } />
                                                    <span className="text-[10px] font-black text-primary truncate" title={ rep }>{ rep }</span>

                                                    <Button
                                                        isIconOnly
                                                        className="h-6 w-6 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        color="danger"
                                                        size="sm"
                                                        variant="light"
                                                        onPress={ () => removeMapping( orig ) }
                                                    >
                                                        <X size={ 12 } />
                                                    </Button>
                                                </div>
                                            )) }
                                    </div>
                                </ScrollShadow>
                            </div>
                        ) }
                </div>
            ) }

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <AlertCircle className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Сопоставления сохраняются глобально в браузере и будут применяться ко всем файлам автоматически.
                </p>
            </div>
        </div>
    );
};
