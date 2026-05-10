"use client";

import { useState, useMemo, ElementType } from "react";
import { Input, Button, ScrollShadow, Chip, ButtonGroup, Tooltip } from "@heroui/react";
import { MatrixSplitLayerSettings } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";
import { Search, Lock, Minus, Check, HelpCircle, Grid2X2 } from "lucide-react";

export const MatrixSplitConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<MatrixSplitLayerSettings> ) => {
    const headers = useMemo(() => prevContext?.headers ?? [], [ prevContext ]);
    const [ search, setSearch ] = useState( "" );

    const fixed = useMemo(() => settings?.fixedColIndices ?? [], [ settings ]);
    const grid = useMemo(() => settings?.gridColIndices ?? [], [ settings ]);

    const filteredColumns = useMemo(() => {
        return headers
            .map(( name, index ) => ({ name: name || `Колонка ${ index + 1 }`, index }))
            .filter(( col ) => col.name.toLowerCase().includes( search.toLowerCase()));
    }, [ headers, search ]);

    const filteredIndices = useMemo(() => filteredColumns.map(( c ) => c.index ), [ filteredColumns ]);

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase mb-1",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white",
    };

    const bulkStates = useMemo(() => {
        const check = ( list: number[]) => {
            const intersection = filteredIndices.filter(( idx ) => list.includes( idx ));
            return {
                all: intersection.length === filteredIndices.length && filteredIndices.length > 0,
                some: intersection.length > 0 && intersection.length < filteredIndices.length,
                none: intersection.length === 0,
            };
        };

        return {
            fixed: check( fixed ),
            grid: check( grid ),
            none: {
                all: filteredIndices.every(( idx ) => !fixed.includes( idx ) && !grid.includes( idx )),
                some: filteredIndices.some(( idx ) => !fixed.includes( idx ) && !grid.includes( idx ))
                    && !filteredIndices.every(( idx ) => !fixed.includes( idx ) && !grid.includes( idx )),
            },
        };
    }, [ filteredIndices, fixed, grid ]);

    // Логика массовых действий и ролей (оставляем прежней, меняем только UI)
    const bulkSetRole = ( role: "none" | "fixed" | "grid" ) => {
        let nextFixed = [ ...fixed ];
        let nextGrid = [ ...grid ];
        nextFixed = nextFixed.filter(( i ) => !filteredIndices.includes( i ));
        nextGrid = nextGrid.filter(( i ) => !filteredIndices.includes( i ));
        if ( role === "fixed" ) nextFixed = [ ...nextFixed, ...filteredIndices ].sort(( a, b ) => a - b );
        if ( role === "grid" ) nextGrid = [ ...nextGrid, ...filteredIndices ].sort(( a, b ) => a - b );
        onUpdate?.({ fixedColIndices: nextFixed, gridColIndices: nextGrid });
    };

    const setRole = ( idx: number, role: "none" | "fixed" | "grid" ) => {
        let nextFixed = fixed.filter(( i ) => i !== idx );
        let nextGrid = grid.filter(( i ) => i !== idx );
        if ( role === "fixed" ) nextFixed = [ ...nextFixed, idx ].sort(( a, b ) => a - b );
        if ( role === "grid" ) nextGrid = [ ...nextGrid, idx ].sort(( a, b ) => a - b );
        onUpdate?.({ fixedColIndices: nextFixed, gridColIndices: nextGrid });
    };

    const getBulkIcon = ( state: { all: boolean, some: boolean }, Icon: ElementType ) => {
        if ( state.all ) return <Check size={ 12 } strokeWidth={ 3 } />;
        if ( state.some ) return <Minus size={ 12 } strokeWidth={ 3 } />;
        return <Icon size={ 12 } />;
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            { /* 1. ОСНОВНЫЕ НАСТРОЙКИ */ }

            <div className="space-y-1.5">
                <label className={ controlClassNames.label }>1. Имя колонки значений</label>

                <Input
                    classNames={ controlClassNames }
                    placeholder="Напр: Количество или Цена"
                    radius="sm"
                    size="sm"
                    value={ settings.valueColumnName }
                    variant="bordered"
                    onValueChange={ ( val ) => onUpdate?.({ valueColumnName: val }) }
                />
            </div>

            { /* 2. ВЫБОР РОЛЕЙ */ }

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className={ controlClassNames.label }>2. Распределение колонок</label>

                    <ButtonGroup size="sm" variant="flat">
                        <Tooltip content="Сбросить поиск" size="sm">
                            <Button
                                isIconOnly
                                className={ `w-7 h-7 ${ bulkStates.none.all ? "bg-slate-400 text-white" : "" }` }
                                variant={ bulkStates.none.all ? "solid" : "flat" }
                                onPress={ () => bulkSetRole( "none" ) }
                            >
                                { getBulkIcon( bulkStates.none, Minus ) }
                            </Button>
                        </Tooltip>

                        <Tooltip content="Все в 'Фикс'" size="sm">
                            <Button
                                isIconOnly
                                className="w-7 h-7"
                                color={ bulkStates.fixed.all || bulkStates.fixed.some ? "primary" : "default" }
                                variant={ bulkStates.fixed.all ? "solid" : "flat" }
                                onPress={ () => bulkSetRole( "fixed" ) }
                            >
                                { getBulkIcon( bulkStates.fixed, Lock ) }
                            </Button>
                        </Tooltip>

                        <Tooltip content="Все в 'Сетку'" size="sm">
                            <Button
                                isIconOnly
                                className={ `w-7 h-7 ${ bulkStates.grid.all ? "text-white" : "" }` }
                                color={ bulkStates.grid.all || bulkStates.grid.some ? "success" : "default" }
                                variant={ bulkStates.grid.all ? "solid" : "flat" }
                                onPress={ () => bulkSetRole( "grid" ) }
                            >
                                { getBulkIcon( bulkStates.grid, Grid2X2 ) }
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </div>

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

                <div className="border border-slate-200 rounded">
                    <div className="grid grid-cols-[30px_1fr_auto] items-center gap-2 px-2 py-1.5 bg-slate-50 border-b border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 font-mono">#</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Заголовок</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase px-2">Роль</span>
                    </div>

                    <ScrollShadow className="max-h-75" offset={ 1 }>
                        { filteredColumns.map(({ name, index }) => {
                            const isFixed = fixed.includes( index );
                            const isGrid = grid.includes( index );
                            const currentRole = isFixed ? "fixed" : isGrid ? "grid" : "none";

                            return (
                                <div key={ index } className="grid grid-cols-[30px_1fr_auto] items-center gap-2 px-2 py-1 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-[10px] font-mono text-slate-400">#{ index }</span>
                                    <span className="text-xs font-bold text-slate-600 truncate">{ name }</span>

                                    <ButtonGroup>
                                        <Button
                                            isIconOnly
                                            className={ `w-7 h-7 min-w-0 ${ currentRole === "none" ? "bg-slate-300 text-slate-800" : "bg-transparent text-slate-500" }` }
                                            size="sm"
                                            variant="flat"
                                            onPress={ () => setRole( index, "none" ) }
                                        >
                                            <Minus size={ 12 } />
                                        </Button>

                                        <Button
                                            isIconOnly
                                            className={ `w-7 h-7 min-w-0 ${ isFixed ? "bg-primary text-white" : "bg-transparent text-slate-500" }` }
                                            size="sm"
                                            variant="flat"
                                            onPress={ () => setRole( index, "fixed" ) }
                                        >
                                            <Lock size={ 12 } />
                                        </Button>

                                        <Button
                                            isIconOnly
                                            className={ `w-7 h-7 min-w-0 ${ isGrid ? "bg-success text-white" : "bg-transparent text-slate-500" }` }
                                            size="sm"
                                            variant="flat"
                                            onPress={ () => setRole( index, "grid" ) }
                                        >
                                            <Grid2X2 size={ 12 } />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            );
                        }) }
                    </ScrollShadow>
                </div>
            </div>

            { /* 3. ИТОГИ */ }

            <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                <div className="flex gap-2">
                    <Chip className="h-5 text-[9px] font-black uppercase bg-blue-100 text-blue-700" size="sm" variant="flat">
                        Фикс: { fixed.length }
                    </Chip>

                    <Chip className="h-5 text-[9px] font-black uppercase bg-green-100 text-green-700" size="sm" variant="flat">
                        Сетка: { grid.length }
                    </Chip>
                </div>

                { grid.length > 0 && (
                    <span className="text-[10px] font-bold text-slate-400 italic">
                        Будет создано { grid.length } таблиц
                    </span>
                ) }
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <HelpCircle className="text-slate-400 shrink-0" size={ 14 } />

                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Колонки «Сетки» станут отдельными таблицами, а «Фикс» колонки будут продублированы в каждой.
                </p>
            </div>
        </div>
    );
};
