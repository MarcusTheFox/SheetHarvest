"use client";

import { Input, Card } from "@heroui/react";
import { ColumnRenameLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type ColumnRenameConfigProps = LayerConfigProps<ColumnRenameLayerSettings>;

export const ColumnRenameConfig = ({ settings, onUpdate, prevContext }: ColumnRenameConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const renames = settings?.renames ?? {};

    const handleRename = (idx: number, newName: string) => {
        onUpdate?.({
            renames: {
                ...renames,
                [idx]: newName
            }
        });
    };

    if (headers.length === 0) {
        return (
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl text-[12px] text-warning-700">
                Для переименования колонок необходимо сначала определить их (запустить предыдущие слои).
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <p className="text-xs text-default-500">
                Введите новые названия для колонок. Оставьте поле пустым, чтобы сохранить текущее название.
            </p>

            <div className="flex flex-col gap-3">
                {headers.map((header, idx) => (
                    <Card key={idx} shadow="none" className="border border-default-100 bg-default-50/30">
                        <div className="p-3 flex flex-col gap-2">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] text-default-400 font-mono uppercase tracking-wider">
                                    COLUMN INDEX: {idx}
                                </span>
                                <span className="text-[10px] text-default-400 italic">
                                    Текущее: {header || `Без названия`}
                                </span>
                            </div>
                            <Input
                                size="sm"
                                placeholder={header || `Колонка ${idx + 1}`}
                                value={renames[idx] || ""}
                                onValueChange={(val) => handleRename(idx, val)}
                                variant="flat"
                                classNames={{
                                    input: "text-sm"
                                }}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
