"use client";

import { Input, Select, SelectItem, Switch, Card } from "@heroui/react";
import { Search } from "lucide-react";
import { RegexExtractionLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type RegexExtractConfigProps = LayerConfigProps<RegexExtractionLayerSettings>;

export const RegexExtractConfig = ({ settings, onUpdate, prevContext }: RegexExtractConfigProps) => {
    const headers = prevContext?.headers ?? [];

    const availableCols = headers.map((h, i) => ({
        label: h || `Колонка ${i + 1}`,
        value: String(i)
    }));

    return (
        <div className="flex flex-col gap-6">
            <Select
                label="Целевая колонка"
                placeholder="Где искать текст?"
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

            <Input
                label="Регулярное выражение (Regex)"
                placeholder="Например: [A-Z]{2}-\d{3}"
                value={settings.pattern || ""}
                startContent={<Search size={18} className="text-default-400" />}
                onValueChange={(val) => {
                    onUpdate?.({pattern: val})
                }}
                description="Оставьте только ту часть текста, которая подходит под шаблон"
            />

            <Card className="p-4 bg-default-50 shadow-none border-none">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold">Оставлять оригинал</span>
                        <span className="text-[10px] text-default-400">Если совпадение не найдено, не очищать ячейку</span>
                    </div>
                    <Switch 
                        size="sm"
                        isSelected={settings.keepOriginalIfNoMatch}
                        onValueChange={(val) => {
                            onUpdate?.({keepOriginalIfNoMatch: val})
                        }}
                    />
                </div>
            </Card>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Шпаргалка:</span>
                <ul className="text-[11px] text-blue-600 list-disc ml-4 space-y-1">
                    <li><b>{"[A-Z]+"}</b> — только заглавные буквы</li>
                    <li><b>\d+</b> — только цифры</li>
                    <li><b>\d{"{2,4}"}</b> — от 2 до 4 цифр</li>
                    <li><b>{"[A-Z]{2}-"}\d{"{3}"}</b> — ваш пример (AA-000)</li>
                </ul>
            </div>
        </div>
    );
};