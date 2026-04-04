"use client";

import { Input, Select, SelectItem, Tabs, Tab, Button, Divider } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import { ColumnSplitLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type ColumnSplitConfigProps = LayerConfigProps<ColumnSplitLayerSettings>;
type SplitMode = ColumnSplitLayerSettings["mode"];

const TABS: { key: SplitMode, title: string }[] = [
    {key: "delimiter", title: "Символ"},
    {key: "regex", title: "Regex (группы)"}
]

export const ColumnSplitConfig = ({ settings, onUpdate, prevContext }: ColumnSplitConfigProps) => {
    const headers = prevContext?.headers ?? [];

    const availableCols = headers.map((h, i) => ({
        label: h || `Колонка ${i + 1}`,
        value: String(i)
    }));

    const names = settings.newNames || ["", ""];

    const handleNameChange = (nameIdx: number, val: string) => {
        const next = [...names];
        next[nameIdx] = val;
        onUpdate?.({ newNames: next });
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
                        onUpdate?.({sourceColIndex: Number(val)})
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
                    onSelectionChange={(key) => {
                        onUpdate?.({mode: key as SplitMode})
                    }}
                >
                    {TABS.map(tab => (
                        <Tab key={tab.key} title={tab.title} />
                    ))}
                </Tabs>

                {settings.mode === 'regex' ? (
                    <Input 
                        label="Regex паттерн"
                        placeholder="Пример: (.*?)\s*-\s*(.*)"
                        value={settings.pattern || ""}
                        onValueChange={(val) => {
                            onUpdate?.({pattern: val});
                        }}
                        description="Используйте скобки ( ) для каждой новой колонки"
                    />
                ) : (
                    <Input 
                        label="Символ-разделитель"
                        placeholder="Например: / или , или ;"
                        value={settings.delimiter || ""}
                        onValueChange={(val) => {
                            onUpdate?.({delimiter: val})
                        }}
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
                                    onPress={() => {
                                        onUpdate?.({newNames: names.filter((_: string, idx: number) => idx !== i)})
                                    }}
                                >
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
                    onPress={() => {
                        onUpdate?.({newNames: [...names, ""]})
                    }}
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