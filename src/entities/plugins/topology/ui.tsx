"use client";

import { useState, useMemo, ElementType } from "react";
import { Input, Button, ScrollShadow, Chip, ButtonGroup, Tooltip } from "@heroui/react";
import { TopologyLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { Search, Check, X, Minus, Filter } from "lucide-react";

type TopologyMode = "any" | "filled" | "empty";

export const TopologyConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<TopologyLayerSettings> ) => {
    const headers = useMemo(() => prevContext?.headers ?? [], [ prevContext ]);
    const topology = useMemo(() => settings.topology ?? {}, [ settings ]);
    const [ search, setSearch ] = useState( "" );

    const filteredColumns = useMemo(() => {
        return headers
            .map(( name, index ) => ({ name: name || `Колонка ${ index + 1 }`, index }))
            .filter(( col ) => col.name.toLowerCase().includes( search.toLowerCase()));
    }, [ headers, search ]);

    const filteredIndices = useMemo(() => filteredColumns.map(( c ) => c.index ), [ filteredColumns ]);

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white",
    };

    const bulkStates = useMemo(() => {
        const check = ( mode: TopologyMode ) => {
            const intersection = filteredIndices.filter(( idx ) => {
                const currentMode = topology[idx] ?? "any";
                return currentMode === mode;
            });
            return {
                all: intersection.length === filteredIndices.length && filteredIndices.length > 0,
                some: intersection.length > 0 && intersection.length < filteredIndices.length,
            };
        };

        return {
            any: check( "any" ),
            filled: check( "filled" ),
            empty: check( "empty" ),
        };
    }, [ filteredIndices, topology ]);

    const getBulkIcon = ( state: { all: boolean, some: boolean }, Icon: ElementType ) => {
        if ( state.all ) return <Check size={ 12 } strokeWidth={ 3 } />;
        if ( state.some ) return <Minus size={ 12 } strokeWidth={ 3 } />;
        return <Icon size={ 12 } />;
    };

    const handleRoleChange = ( idx: number, mode: TopologyMode ) => {
        const next = { ...topology };
        if ( mode === "any" ) delete next[idx];
        else next[idx] = mode;
        onUpdate?.({ topology: next });
    };

    const bulkSetRole = ( mode: TopologyMode ) => {
        const next = { ...topology };
        filteredIndices.forEach(( idx ) => {
            if ( mode === "any" ) delete next[idx];
            else next[idx] = mode;
        });
        onUpdate?.({ topology: next });
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="space-y-3">
                <label className={ controlClassNames.label }>1. Требования к заполнению</label>

                <div className="flex items-center gap-4 justify-between">
                    <Input
                        classNames={ controlClassNames }
                        placeholder="Поиск по заголовкам..."
                        radius="sm"
                        size="sm"
                        startContent={ <Search className="text-slate-400" size={ 12 } /> }
                        value={ search }
                        variant="bordered"
                        onValueChange={ setSearch }
                    />

                    <ButtonGroup size="sm" variant="flat">
                        <Tooltip content="Сбросить все (Любое)" size="sm">
                            <Button
                                isIconOnly
                                className={ `w-7 h-7 ${ bulkStates.any.all ? "bg-slate-400 text-white" : "" }` }
                                variant={ bulkStates.any.all ? "solid" : "flat" }
                                onPress={ () => bulkSetRole( "any" ) }
                            >
                                { getBulkIcon( bulkStates.any, Minus ) }
                            </Button>
                        </Tooltip>

                        <Tooltip content="Все: Заполнено" size="sm">
                            <Button
                                isIconOnly
                                className={ `w-7 h-7 ${ bulkStates.filled.all ? "bg-success text-white" : "" }` }
                                color={ bulkStates.filled.all || bulkStates.filled.some ? "success" : "default" }
                                variant={ bulkStates.filled.all ? "solid" : "flat" }
                                onPress={ () => bulkSetRole( "filled" ) }
                            >
                                { getBulkIcon( bulkStates.filled, Check ) }
                            </Button>
                        </Tooltip>

                        <Tooltip content="Все: Пусто" size="sm">
                            <Button
                                isIconOnly
                                className="w-7 h-7"
                                color={ bulkStates.empty.all || bulkStates.empty.some ? "danger" : "default" }
                                variant={ bulkStates.empty.all ? "solid" : "flat" }
                                onPress={ () => bulkSetRole( "empty" ) }
                            >
                                { getBulkIcon( bulkStates.empty, X ) }
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </div>

                <div className="border border-slate-200 rounded">
                    <div className="grid grid-cols-[30px_1fr_auto] items-center gap-2 px-2 py-1.5 bg-slate-50 border-b border-slate-200">
                        <span className="text-[9px] font-black text-slate-400 font-mono">#</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Заголовок</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase px-2 text-right">Правило</span>
                    </div>

                    <ScrollShadow className="max-h-80" offset={ 1 }>
                        { filteredColumns.map(({ name, index }) => {
                            const currentMode = topology[index] ?? "any";

                            return (
                                <div key={ index } className="grid grid-cols-[30px_1fr_auto] items-center gap-2 px-2 py-1 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] font-mono text-slate-400">#{ index }</span>
                                    <span className="text-xs font-bold text-slate-600 truncate">{ name }</span>

                                    <ButtonGroup>
                                        <Button
                                            isIconOnly
                                            className={ `w-7 h-7 min-w-0 ${ currentMode === "any" ? "bg-slate-300 text-slate-800" : "bg-transparent text-slate-500" }` }
                                            size="sm"
                                            variant="flat"
                                            onPress={ () => handleRoleChange( index, "any" ) }
                                        >
                                            <Minus size={ 12 } />
                                        </Button>

                                        <Button
                                            isIconOnly
                                            className={ `w-7 h-7 min-w-0 ${ currentMode === "filled" ? "bg-success text-white" : "bg-transparent text-slate-500" }` }
                                            size="sm"
                                            variant="flat"
                                            onPress={ () => handleRoleChange( index, "filled" ) }
                                        >
                                            <Check size={ 12 } />
                                        </Button>

                                        <Button
                                            isIconOnly
                                            className={ `w-7 h-7 min-w-0 ${ currentMode === "empty" ? "bg-danger text-white" : "bg-transparent text-slate-500" }` }
                                            size="sm"
                                            variant="flat"
                                            onPress={ () => handleRoleChange( index, "empty" ) }
                                        >
                                            <X size={ 12 } />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            );
                        }) }
                    </ScrollShadow>
                </div>
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                <div className="flex gap-2">
                    <Chip className="h-5 text-[9px] font-black uppercase bg-slate-200 text-slate-600" size="sm" variant="flat">
                        Колонок: { headers.length }
                    </Chip>

                    <Chip className="h-5 text-[9px] font-black uppercase bg-primary-100 text-primary-700" size="sm" variant="flat">
                        Активных: { Object.keys( topology ).length }
                    </Chip>
                </div>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <Filter className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Строки, не соответствующие правилам заполнености, будут удалены из результата.
                </p>
            </div>
        </div>
    );
};
