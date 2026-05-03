"use client";

import {
    Button, Select, SelectItem, Input, Divider,
    Autocomplete, AutocompleteItem
} from "@heroui/react";
import { X, Check, Save, Database, AlertCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { ValueMappingLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";
import { useMappingStore } from "@/entities/value-mapping/model/store";
import { useShallow } from "zustand/shallow";

type ValueMappingConfigProps = LayerConfigProps<ValueMappingLayerSettings>;

export const ValueMappingConfig = ({ settings, onUpdate, prevContext }: ValueMappingConfigProps) => {
    const headers = prevContext?.headers ?? [];

    const { mappings, isLoaded, loadMappings, addMapping, removeMapping } = useMappingStore(
        useShallow(s => ({
            mappings: s.mappings,
            isLoaded: s.isLoaded,
            loadMappings: s.loadMappings,
            addMapping: s.addMapping,
            removeMapping: s.removeMapping,
        }))
    );
    const [isDbOpen, setIsDbOpen] = useState(false);

    useEffect(() => {
        loadMappings();
    }, [loadMappings]);

    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState("");

    // Доступные колонки
    const availableCols = headers.map((h, i) => ({
        label: h || `Колонка ${i + 1}`,
        value: String(i)
    }));

    // Все уникальные значения в выбранной колонке
    const uniqueValuesInCol = useMemo(() => {
        if (settings.sourceColIndex === undefined || !prevContext?.tables) return [];
        const vals = new Set<string>();
        prevContext.tables.forEach(table => {
            table.rows.forEach(row => {
                const val = String(row.cells[settings.sourceColIndex] || '').trim();
                if (val) vals.add(val);
            });
        });
        return Array.from(vals);
    }, [prevContext?.tables, settings.sourceColIndex]);

    // Несопоставленные значения (те, которых нет в store)
    const unmappedValues = useMemo(() => {
        const lowerMappings = Object.keys(mappings).map(k => k.toLowerCase());
        return uniqueValuesInCol.filter(v => !lowerMappings.includes(v.toLowerCase()));
    }, [uniqueValuesInCol, mappings]);

    // Существующие уникальные варианты замен для автокомплита
    const existingReplacements = useMemo(() => {
        return Array.from(new Set(Object.values(mappings))).sort();
    }, [mappings]);

    // Сохраненные сопоставления
    const savedMappingsList = useMemo(() => {
        let list = Object.entries(mappings);
        if (filterText) {
            const f = filterText.toLowerCase();
            list = list.filter(([k, v]) => k.toLowerCase().includes(f) || v.toLowerCase().includes(f));
        }
        return list;
    }, [mappings, filterText]);

    const handleSaveMapping = async (original: string) => {
        const replacement = inputValues[original]?.trim();
        if (replacement) {
            await addMapping(original, replacement);
            setInputValues(prev => {
                const next = { ...prev };
                delete next[original];
                return next;
            });
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* ШАГ 1: ВЫБОР КОЛОНКИ */}
            <div className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-default-700">1. Выберите целевую колонку</h4>
                <Select
                    label="Целевая колонка"
                    placeholder="Выберите колонку со значениями"
                    selectedKeys={settings.sourceColIndex !== undefined ? [String(settings.sourceColIndex)] : []}
                    onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0];
                        onUpdate?.({ sourceColIndex: Number(val) });
                    }}
                >
                    {availableCols.map((col) => (
                        <SelectItem key={col.value}>
                            {col.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            {settings.sourceColIndex !== undefined && isLoaded && (
                <div className="flex flex-col gap-8">
                    {/* VIEW 1: ОСНОВНЫЕ НАСТРОЙКИ (КОЛОНКА И НОВЫЕ) */}
                    {!isDbOpen ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center bg-default-50 p-3 rounded-xl border border-default-200">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-sm font-bold text-default-700">Требуют сопоставления</h4>
                                    {unmappedValues.length > 0 && (
                                        <span className="text-xs bg-warning-100 text-warning-700 font-bold px-2 py-0.5 rounded-full">
                                            {unmappedValues.length} новых
                                        </span>
                                    )}
                                </div>
                                <Button size="sm" color="primary" variant="flat" onPress={() => setIsDbOpen(true)} startContent={<Database size={14} />}>
                                    База замен
                                </Button>
                            </div>

                            {unmappedValues.length === 0 ? (
                                <div className="flex items-center gap-3 p-4 bg-success-50 rounded-xl border border-success-100 text-success-700 text-sm">
                                    <Check size={18} />
                                    <span>Все значения в текущей колонке сопоставлены!</span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2 pb-2">
                                    {unmappedValues.map(val => (
                                        <div key={val} className="flex gap-2 items-center bg-default-50 p-2 rounded-lg border border-default-200 shadow-sm transition-all hover:bg-default-100">
                                            <div className="flex-1 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-default-700 font-medium px-2" title={val}>
                                                {val}
                                            </div>
                                            <Autocomplete
                                                size="sm"
                                                allowsCustomValue
                                                placeholder="Выберите или введите..."
                                                inputValue={inputValues[val] || ""}
                                                onInputChange={(valStr) => setInputValues({ ...inputValues, [val]: valStr })}
                                                className="w-1/2"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") handleSaveMapping(val);
                                                }}
                                                listboxProps={{
                                                    emptyContent: "Нет совпадений"
                                                }}
                                            >
                                                {existingReplacements.map(rep => (
                                                    <AutocompleteItem key={rep}>{rep}</AutocompleteItem>
                                                ))}
                                            </Autocomplete>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                color="primary"
                                                onPress={() => handleSaveMapping(val)}
                                                isDisabled={!inputValues[val]?.trim()}
                                            >
                                                <Save size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-200">
                            {/* VIEW 2: БАЗА СОПОСТАВЛЕНИЙ */}
                            <div className="flex items-center gap-3 mb-2">
                                <Button isIconOnly size="sm" variant="light" onPress={() => setIsDbOpen(false)}>
                                    <span className="text-xl leading-none">&larr;</span>
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Database size={18} className="text-default-600" />
                                    <h4 className="text-sm font-bold text-default-700">Глобальная база сопоставлений</h4>
                                    <span className="text-xs bg-default-100 text-default-600 font-bold px-2 py-0.5 rounded-full ml-2">
                                        {Object.keys(mappings).length}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-primary-50 p-3 rounded-lg flex items-start gap-2 mb-2">
                                <AlertCircle size={16} className="text-primary-500 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-primary-700 leading-relaxed">
                                    Значения, добавленные сюда, автоматически подменяются при запусках пайплайна, если встречаются в выбранной колонке.
                                </p>
                            </div>

                            <Input
                                size="sm"
                                placeholder="Поиск по оригиналу или замене..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                isClearable
                                onClear={() => setFilterText("")}
                                className="mb-2"
                            />

                            {savedMappingsList.length === 0 ? (
                                <div className="p-8 text-center text-sm text-default-400 bg-default-50 rounded-xl border border-default-100">
                                    Сопоставлений не найдено
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 pb-2">
                                    {savedMappingsList.map(([orig, rep]) => (
                                        <div key={orig} className="flex items-center justify-between gap-3 bg-default-50 p-2 rounded-lg border border-default-200">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="flex flex-col flex-1 min-w-0 max-w-[45%]">
                                                    <span className="text-[10px] text-default-400 uppercase font-bold tracking-wider mb-0.5">Оригинал</span>
                                                    <span className="text-xs font-semibold text-danger-600 bg-danger-50 border border-danger-100 px-2 py-1 rounded truncate w-full" title={orig}>{orig}</span>
                                                </div>
                                                <div className="text-default-300 mt-4">→</div>
                                                <div className="flex flex-col flex-1 min-w-0 max-w-[45%]">
                                                    <span className="text-[10px] text-default-400 uppercase font-bold tracking-wider mb-0.5">Замена</span>
                                                    <span className="text-xs font-semibold text-success-600 bg-success-50 border border-success-100 px-2 py-1 rounded truncate w-full" title={rep}>{rep}</span>
                                                </div>
                                            </div>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                color="danger"
                                                className="mt-4"
                                                onPress={() => removeMapping(orig)}
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};
