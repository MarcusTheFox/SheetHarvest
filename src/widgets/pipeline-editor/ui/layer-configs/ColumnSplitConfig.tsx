"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { getActiveColIndices } from "@/features/run-extraction/lib/extraction-utils";
import { Input, Select, SelectItem, Tabs, Tab, Button, Divider } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import { LayerConfigProps } from ".";
import { ColumnSplitLayerSettings } from "@/features/run-extraction/lib/pipeline/layers/transformers/columnSplitLayer";
import { useShallow } from "zustand/shallow";

type ColumnSplitConfigProps = LayerConfigProps<ColumnSplitLayerSettings>;

export const ColumnSplitConfig = ({ index, settings }: ColumnSplitConfigProps) => {
    const { updateLayerSettings, customNames, selectedColumns, isManualMode, headerRowIndex } = usePatternStore(
        useShallow(s => ({
            updateLayerSettings: s.updateLayerSettings,
            customNames: s.customNames,
            selectedColumns: s.selectedColumns,
            isManualMode: s.isManualMode,
            headerRowIndex: s.headerRowIndex,
        }))
    );

    const sheets = useSpreadsheetStore(s => s.sheets);
    const currentSheetIndex = useSpreadsheetStore(s => s.currentSheetIndex);

    const currentSheet = sheets[currentSheetIndex];

    // Определяем список колонок, доступных в паттерне
    const activeIndices = getActiveColIndices({
        allRows: currentSheet.data,
        headerRowIndex,
        tableHeaderRow: headerRowIndex !== null ? currentSheet.data[headerRowIndex] : [],
        hiddenColumns: usePatternStore.getState().hiddenColumns,
        selectedColumns,
        isManualMode,
        customNames,
        merges: currentSheet.merges
    });

    // 2. Формируем список опций на основе того, что реально увидит пользователь в результате
    const availableCols = activeIndices.map((originalIdx, relativeIdx) => {
        const name = customNames[originalIdx] || 
                     currentSheet.data[headerRowIndex!]?.[originalIdx]?.toString() || 
                     `Колонка ${String.fromCharCode(65 + originalIdx)}`;
        return {
            label: name,
            value: String(relativeIdx)
        };
    });

    const names = settings.newNames || ["", ""];

    const handleNameChange = (nameIdx: number, val: string) => {
        const next = [...names];
        next[nameIdx] = val;
        updateLayerSettings(index, { newNames: next });
    };

    return (
        <div className="flex flex-col gap-6">
            {/* 1. Выбор колонки */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-default-700">1. Выберите колонку для разделения</span>
                <Select
                    label="Целевая колонка"
                    placeholder="Какую колонку разбиваем?"
                    selectedKeys={settings.sourceColIndex !== undefined ? [String(settings.sourceColIndex)] : []}
                    onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0];
                        updateLayerSettings(index, { sourceColIndex: Number(val) });
                    }}
                >
                    {availableCols.map((col) => (
                        <SelectItem key={col.value}>{col.label}</SelectItem>
                    ))}
                </Select>
            </div>

            <Divider className="my-2" />

            {/* 2. Настройка логики */}
            <div className="flex flex-col gap-4">
                <span className="text-sm font-bold text-default-700">2. Метод разделения</span>
                <Tabs 
                    fullWidth 
                    selectedKey={settings.mode || 'delimiter'}
                    onSelectionChange={(key) => updateLayerSettings(index, { mode: key })}
                >
                    <Tab key="delimiter" title="Символ" />
                    <Tab key="regex" title="Regex (группы)" />
                </Tabs>

                {settings.mode === 'regex' ? (
                    <Input 
                        label="Regex паттерн"
                        placeholder="Пример: (.*?)\s*-\s*(.*)"
                        value={settings.pattern || ""}
                        onValueChange={(val) => updateLayerSettings(index, { pattern: val })}
                        description="Используйте скобки ( ) для каждой новой колонки"
                    />
                ) : (
                    <Input 
                        label="Символ-разделитель"
                        placeholder="Например: / или , или ;"
                        value={settings.delimiter || ""}
                        onValueChange={(val) => updateLayerSettings(index, { delimiter: val })}
                    />
                )}
            </div>

            <Divider className="my-2" />

            {/* 3. Имена новых колонок */}
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-default-700">3. Результирующие колонки</span>
                <div className="flex flex-col gap-2">
                    {names.map((name: string, i: number) => (
                        <div key={i} className="flex gap-2 items-center">
                            <div className="bg-default-100 px-2 py-2 rounded-lg text-[10px] font-mono font-bold text-default-400">
                                #{i + 1}
                            </div>
                            <Input 
                                size="sm"
                                placeholder="Название колонки"
                                variant="flat"
                                value={name}
                                onValueChange={(val) => handleNameChange(i, val)}
                            />
                            {names.length > 2 && (
                                <Button isIconOnly size="sm" variant="light" color="danger" 
                                    onPress={() => updateLayerSettings(index, { newNames: names.filter((_: string, idx: number) => idx !== i) })}>
                                    <Trash2 size={14} />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <Button 
                    size="sm" 
                    variant="flat" 
                    color="primary"
                    startContent={<Plus size={16}/>}
                    onPress={() => updateLayerSettings(index, { newNames: [...names, ""] })}
                >
                    Добавить колонку
                </Button>
            </div>

            <div className="bg-primary-50 p-4 rounded-xl flex items-start gap-3 mt-4">
                <div className="text-primary-500 mt-0.5">💡</div>
                <p className="text-[11px] text-primary-700 leading-relaxed">
                    Этот слой заменит одну выбранную колонку на несколько новых. 
                    Оригинальные данные в этой колонке будут удалены из результата.
                </p>
            </div>
        </div>
    );
};