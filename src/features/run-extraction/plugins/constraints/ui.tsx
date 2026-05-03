"use client";

import { Select, SelectItem, Button, Input, Card } from "@heroui/react";
import { Trash2, Plus } from "lucide-react";
import { ConstraintsLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";
import { ColumnConstraint, ConstraintType } from "@/entities/pattern/model/types";

type ConstraintsConfigProps = LayerConfigProps<ConstraintsLayerSettings>;

const CONSTRAINT_TYPES: { key: ConstraintType; label: string }[] = [
    { key: 'not_empty', label: 'Не пустое' },
    { key: 'is_number', label: 'Число' },
    { key: 'is_date', label: 'Дата' },
    { key: 'regex', label: 'Regex' },
    { key: 'any', label: 'Любое' },
];

export const ConstraintsConfig = ({ settings, onUpdate, prevContext }: ConstraintsConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const constraints = settings?.constraints ?? [];

    if (headers.length === 0) {
        return (
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl text-[12px] text-warning-700">
                Для настройки ограничений необходимо сначала определить колонки (запустить предыдущие слои).
            </div>
        );
    }

    const handleAdd = () => {
        const usedIndices = new Set(constraints.map(c => c.colIndex));
        const freeIdx = headers.findIndex((_, i) => !usedIndices.has(i));
        const colIndex = freeIdx >= 0 ? freeIdx : 0;
        const next: ColumnConstraint[] = [...constraints, { colIndex, type: 'not_empty' }];
        onUpdate?.({ constraints: next });
    };

    const handleRemove = (idx: number) => {
        onUpdate?.({ constraints: constraints.filter((_, i) => i !== idx) });
    };

    const handleColChange = (idx: number, colIndex: number) => {
        const next = [...constraints];
        next[idx] = { ...next[idx], colIndex };
        onUpdate?.({ constraints: next });
    };

    const handleTypeChange = (idx: number, type: ConstraintType) => {
        const next = [...constraints];
        next[idx] = { ...next[idx], type };
        onUpdate?.({ constraints: next });
    };

    const handlePatternChange = (idx: number, pattern: string) => {
        const next = [...constraints];
        next[idx] = { ...next[idx], pattern };
        onUpdate?.({ constraints: next });
    };

    const columns = headers.map((h, i) => ({ label: h || `Колонка ${i + 1}`, value: String(i) }));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-default-700">Правила валидации</span>
                <p className="text-[11px] text-default-500 leading-relaxed">
                    Настройте требования к данным. Строки, не прошедшие проверку, будут удалены из результата.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {constraints.map((c, idx) => (
                    <Card key={idx} shadow="none" className="border border-default-100 bg-default-50/30 overflow-visible">
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-default-400">
                                    <span className="text-[10px] font-black font-mono">#{idx + 1}</span>
                                </div>
                                <Button
                                    isIconOnly size="sm" variant="light" color="danger"
                                    onPress={() => handleRemove(idx)}
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Select
                                    size="sm"
                                    label="Колонка"
                                    variant="bordered"
                                    selectedKeys={[String(c.colIndex)]}
                                    onSelectionChange={(keys) => {
                                        const val = Array.from(keys)[0];
                                        if (val !== undefined) handleColChange(idx, Number(val));
                                    }}
                                >
                                    {columns.map(col => (
                                        <SelectItem key={col.value}>{col.label}</SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    size="sm"
                                    label="Тип данных"
                                    variant="bordered"
                                    selectedKeys={[c.type]}
                                    onSelectionChange={(keys) => {
                                        const val = Array.from(keys)[0];
                                        if (val) handleTypeChange(idx, val as ConstraintType);
                                    }}
                                >
                                    {CONSTRAINT_TYPES.map(t => (
                                        <SelectItem key={t.key}>{t.label}</SelectItem>
                                    ))}
                                </Select>
                            </div>

                            {c.type === 'regex' && (
                                <div className="pt-1">
                                    <Input
                                        size="sm"
                                        label="Регулярное выражение (Pattern)"
                                        placeholder="Например: ^[A-Z]{3}-\d+$"
                                        variant="bordered"
                                        value={c.pattern || ""}
                                        onValueChange={(val) => handlePatternChange(idx, val)}
                                        description="Проверка значения ячейки по шаблону"
                                    />
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            <Button
                size="sm" variant="flat" color="primary"
                startContent={<Plus size={16} />}
                onPress={handleAdd}
                className="w-full sm:w-auto"
            >
                Добавить правило
            </Button>
        </div>
    );
};

