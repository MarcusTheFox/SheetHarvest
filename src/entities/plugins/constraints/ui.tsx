// entities/step/constraints/ui.tsx
"use client";

import { Select, SelectItem, Button, Input, Tooltip } from "@heroui/react";
import { Trash2, Plus, AlertCircle, ShieldCheck } from "lucide-react";
import { ColumnConstraint, ConstraintsLayerSettings, ConstraintType } from "./types";
import { LayerConfigProps } from "@/shared/types/layer";

const CONSTRAINT_TYPES: { key: ConstraintType; label: string }[] = [
    { key: "not_empty", label: "Не пустое" },
    { key: "is_number", label: "Число" },
    { key: "is_date", label: "Дата" },
    { key: "regex", label: "Regex" },
    { key: "any", label: "Любое" },
];

export const ConstraintsConfig = ({ settings, onUpdate, prevContext }: LayerConfigProps<ConstraintsLayerSettings> ) => {
    const headers = prevContext?.headers ?? [];
    const constraints = settings?.constraints ?? [];

    const controlClassNames = {
        label: "text-[10px] font-bold text-slate-500 uppercase block tracking-widest",
        input: "text-xs font-bold text-slate-700",
        inputWrapper: "h-8 min-h-8 border-slate-200 bg-white shadow-none",
        selectTrigger: "h-8 min-h-8 border-slate-200 bg-white shadow-none",
        selectValue: "text-[11px] font-bold text-slate-700",
    };

    const handleAdd = () => {
        const next: ColumnConstraint[] = [ ...constraints, { colIndex: 0, type: "not_empty" } ];
        onUpdate?.({ constraints: next });
    };

    const updateConstraint = ( idx: number, patch: Partial<ColumnConstraint> ) => {
        const next = [ ...constraints ];
        next[idx] = { ...next[idx], ...patch };
        onUpdate?.({ constraints: next });
    };

    const handleRemove = ( idx: number ) => {
        onUpdate?.({ constraints: constraints.filter(( _, i ) => i !== idx ) });
    };

    if ( headers.length === 0 ) {
        return (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500 italic">
                Сначала определите колонки в предыдущих слоях.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className={ controlClassNames.label }>Правила валидации</label>
                    <Button
                        isIconOnly
                        className="w-5 h-5 min-w-0 bg-primary text-white shadow-sm"
                        radius="full"
                        size="sm"
                        onPress={ handleAdd }
                    >
                        <Plus size={ 12 } />
                    </Button>
                </div>

                <div className="border border-slate-200 rounded overflow-hidden">
                    { /* Header */ }
                    <div className="grid grid-cols-[1fr_1fr_32px] items-center gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Колонка</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Тип проверки</span>
                        <span className="sr-only">Удалить</span>
                    </div>

                    { /* List */ }
                    <div className="flex flex-col bg-white">
                        { constraints.map(( c, idx ) => (
                            <div key={ idx } className="border-b border-slate-100 last:border-0 p-3 space-y-2">
                                <div className="grid grid-cols-[1fr_1fr_32px] items-start gap-2">
                                    <Select
                                        size="sm"
                                        variant="bordered"
                                        radius="sm"
                                        classNames={{ trigger: controlClassNames.selectTrigger, value: controlClassNames.selectValue }}
                                        selectedKeys={ [ String( c.colIndex ) ] }
                                        onSelectionChange={ ( keys ) => updateConstraint( idx, { colIndex: Number( Array.from( keys )[0] ) } ) }
                                    >
                                        { headers.map(( h, i ) => (
                                            <SelectItem key={ i } className="text-xs">{ h || `Колонка ${ i }` }</SelectItem>
                                        )) }
                                    </Select>

                                    <Select
                                        size="sm"
                                        variant="bordered"
                                        radius="sm"
                                        classNames={{ trigger: controlClassNames.selectTrigger, value: controlClassNames.selectValue }}
                                        selectedKeys={ [ c.type ] }
                                        onSelectionChange={ ( keys ) => updateConstraint( idx, { type: Array.from( keys )[0] as ConstraintType } ) }
                                    >
                                        { CONSTRAINT_TYPES.map(( t ) => (
                                            <SelectItem key={ t.key } className="text-xs">{ t.label }</SelectItem>
                                        )) }
                                    </Select>

                                    <Button
                                        isIconOnly
                                        className="h-8 w-8 min-w-0 text-slate-300 hover:text-danger transition-colors"
                                        variant="light"
                                        onPress={ () => handleRemove( idx ) }
                                    >
                                        <Trash2 size={ 14 } />
                                    </Button>
                                </div>

                                { c.type === "regex" && (
                                    <div className="animate-in slide-in-from-top-1 duration-200">
                                        <Input
                                            placeholder="Паттерн: ^\d{3}-\d{2}$"
                                            size="sm"
                                            variant="bordered"
                                            radius="sm"
                                            classNames={ controlClassNames }
                                            value={ c.pattern || "" }
                                            onValueChange={ ( val ) => updateConstraint( idx, { pattern: val } ) }
                                        />
                                    </div>
                                ) }
                            </div>
                        )) }

                        { constraints.length === 0 && (
                            <div className="p-6 text-center">
                                <p className="text-[11px] text-slate-400 italic">Нет активных правил проверки</p>
                            </div>
                        ) }
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 flex gap-2">
                <ShieldCheck className="text-slate-400 shrink-0" size={ 14 } />
                <p className="text-[10px] text-slate-500 leading-normal italic">
                    Строки, не соответствующие правилам, будут удалены из финального результата.
                </p>
            </div>
        </div>
    );
};