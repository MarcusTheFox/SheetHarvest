"use client";

import { useState, useMemo } from "react";
import { Input, Button, ScrollShadow, Divider, Chip, ButtonGroup, Tooltip } from "@heroui/react";
import { MatrixSplitLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";
import { Search, Lock, Grid3X3, Minus, Check, MinusSquare, Square } from "lucide-react";

export const MatrixSplitConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<MatrixSplitLayerSettings>) => {
    const headers = prevContext?.headers ?? [];
    const [search, setSearch] = useState("");

    const fixed = settings?.fixedColIndices ?? [];
    const grid = settings?.gridColIndices ?? [];

    const filteredColumns = useMemo(() => {
        return headers
            .map((name, index) => ({ name: name || `Колонка ${index + 1}`, index }))
            .filter(col => col.name.toLowerCase().includes(search.toLowerCase()));
    }, [headers, search]);

    const filteredIndices = useMemo(() => filteredColumns.map(c => c.index), [filteredColumns]);

    // Вычисляем состояния для массовых кнопок
    const bulkStates = useMemo(() => {
        const check = (list: number[]) => {
            const intersection = filteredIndices.filter(idx => list.includes(idx));
            return {
                all: intersection.length === filteredIndices.length && filteredIndices.length > 0,
                some: intersection.length > 0 && intersection.length < filteredIndices.length,
                none: intersection.length === 0
            };
        };

        return {
            fixed: check(fixed),
            grid: check(grid),
            none: {
                all: filteredIndices.every(idx => !fixed.includes(idx) && !grid.includes(idx)),
                some: filteredIndices.some(idx => !fixed.includes(idx) && !grid.includes(idx)) && 
                      !filteredIndices.every(idx => !fixed.includes(idx) && !grid.includes(idx)),
            }
        };
    }, [filteredIndices, fixed, grid]);

    const bulkSetRole = (role: 'none' | 'fixed' | 'grid') => {
        let nextFixed = [...fixed];
        let nextGrid = [...grid];

        if (role === 'none') {
            nextFixed = nextFixed.filter(i => !filteredIndices.includes(i));
            nextGrid = nextGrid.filter(i => !filteredIndices.includes(i));
        } else {
            // Очищаем текущие отфильтрованные из обоих списков
            nextFixed = nextFixed.filter(i => !filteredIndices.includes(i));
            nextGrid = nextGrid.filter(i => !filteredIndices.includes(i));
            // Добавляем в нужный
            if (role === 'fixed') nextFixed = [...nextFixed, ...filteredIndices].sort((a,b)=>a-b);
            if (role === 'grid') nextGrid = [...nextGrid, ...filteredIndices].sort((a,b)=>a-b);
        }

        onUpdate?.({ fixedColIndices: nextFixed, gridColIndices: nextGrid });
    };

    const setRole = (idx: number, role: 'none' | 'fixed' | 'grid') => {
        let nextFixed = fixed.filter(i => i !== idx);
        let nextGrid = grid.filter(i => i !== idx);
        if (role === 'fixed') nextFixed = [...nextFixed, idx].sort((a,b)=>a-b);
        if (role === 'grid') nextGrid = [...nextGrid, idx].sort((a,b)=>a-b);
        onUpdate?.({ fixedColIndices: nextFixed, gridColIndices: nextGrid });
    };

    // Вспомогательная функция для иконки массовой кнопки
    const getBulkIcon = (state: {all: boolean, some: boolean}, Icon: any) => {
        if (state.all) return <Check size={14} strokeWidth={3} />;
        if (state.some) return <Minus size={14} strokeWidth={3} />;
        return <Icon size={14} />;
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-3">
                <Input
                    size="sm"
                    label="Название колонки значений"
                    value={settings.valueColumnName}
                    onValueChange={(val) => onUpdate?.({ valueColumnName: val })}
                />
                <Input
                    size="sm"
                    placeholder="Поиск по колонкам..."
                    startContent={<Search size={14} />}
                    value={search}
                    onValueChange={setSearch}
                    isClearable
                />
            </div>

            <Divider />

            {/* ГЛОБАЛЬНЫЕ ПЕРЕКЛЮЧАТЕЛИ */}
            <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-default-400 uppercase">
                    {search ? `Найдено: ${filteredColumns.length}` : 'Все колонки'}
                </span>
                <ButtonGroup size="sm" variant="flat">
                    <Tooltip content="Сбросить все найденные" size="sm">
                        <Button 
                            isIconOnly 
                            onPress={() => bulkSetRole('none')}
                            className={bulkStates.none.all ? "bg-default-400 text-white" : ""}
                        >
                            {getBulkIcon(bulkStates.none, Minus)}
                        </Button>
                    </Tooltip>
                    <Tooltip content="Все найденные в 'Фикс'" size="sm">
                        <Button 
                            isIconOnly 
                            color={bulkStates.fixed.all || bulkStates.fixed.some ? "primary" : "default"}
                            variant={bulkStates.fixed.all ? "solid" : "flat"}
                            onPress={() => bulkSetRole('fixed')}
                        >
                            {getBulkIcon(bulkStates.fixed, Lock)}
                        </Button>
                    </Tooltip>
                    <Tooltip content="Все найденные в 'Сетку'" size="sm">
                        <Button 
                            isIconOnly 
                            color={bulkStates.grid.all || bulkStates.grid.some ? "success" : "default"}
                            variant={bulkStates.grid.all ? "solid" : "flat"}
                            onPress={() => bulkSetRole('grid')}
                        >
                            {getBulkIcon(bulkStates.grid, Grid3X3)}
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </div>

            <div className="flex flex-col border border-default-100 rounded-xl overflow-hidden bg-default-50/30">
                <div className="grid grid-cols-[40px_1fr_auto] gap-2 px-3 py-2 bg-default-100 text-[10px] font-bold uppercase text-default-500">
                    <span>#</span>
                    <span>Заголовок</span>
                    <span className="text-right">Роль</span>
                </div>
                
                <ScrollShadow className="max-h-[400px]">
                    {filteredColumns.map(({ name, index }) => {
                        const isFixed = fixed.includes(index);
                        const isGrid = grid.includes(index);
                        const currentRole = isFixed ? 'fixed' : isGrid ? 'grid' : 'none';

                        return (
                            <div key={index} className="grid grid-cols-[40px_1fr_auto] items-center gap-2 px-3 py-1.5 border-b border-default-100 last:border-0 hover:bg-default-100/50">
                                <span className="text-[10px] font-mono text-default-400">#{index}</span>
                                <span className="text-xs font-medium truncate">{name}</span>
                                
                                <ButtonGroup size="sm" variant="flat" className="h-7">
                                    <Button isIconOnly className={currentRole === 'none' ? "bg-default-300" : ""} onPress={() => setRole(index, 'none')}>
                                        <Minus size={14} />
                                    </Button>
                                    <Button isIconOnly className={isFixed ? "bg-primary text-white" : ""} onPress={() => setRole(index, 'fixed')}>
                                        <Lock size={14} />
                                    </Button>
                                    <Button isIconOnly className={isGrid ? "bg-success text-white" : ""} onPress={() => setRole(index, 'grid')}>
                                        <Grid3X3 size={14} />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        );
                    })}
                </ScrollShadow>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
                <Chip size="sm" variant="dot" color="primary">Фикс: {fixed.length}</Chip>
                <Chip size="sm" variant="dot" color="success">Сетка: {grid.length}</Chip>
                {grid.length > 0 && (
                    <Chip size="sm" variant="flat" color="warning" className="ml-auto">
                        Итого таблиц: {grid.length}
                    </Chip>
                )}
            </div>
        </div>
    );
};