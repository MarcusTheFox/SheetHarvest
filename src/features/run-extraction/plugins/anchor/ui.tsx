"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { AnchorLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";
import { AnchorPoint } from "@/entities/pattern/model/types";

type AnchorConfigProps = LayerConfigProps<AnchorLayerSettings>;

const AnchorPointEditor = ({
    label,
    point,
    columns,
    onChange,
}: {
    label: string;
    point: AnchorPoint | null;
    columns: { label: string; value: string }[];
    onChange: (point: AnchorPoint | null) => void;
}) => {
    const handleColChange = (colIndex: number) => {
        onChange({ text: point?.text ?? "", colIndex });
    };
    const handleTextChange = (text: string) => {
        onChange({ 
            colIndex: point?.colIndex ?? 0, 
            text 
        });
    };


    return (
        <div className="flex flex-col gap-3 p-4 bg-default-50 rounded-xl border border-default-100">
            <span className="text-xs font-bold text-default-500 uppercase tracking-widest">{label}</span>
            <Select
                label="Колонка для поиска"
                placeholder="Выберите колонку"
                selectedKeys={point?.colIndex !== undefined ? [String(point.colIndex)] : []}
                onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0];
                    if (val !== undefined) handleColChange(Number(val));
                }}
            >
                {columns.map((col) => (
                    <SelectItem key={col.value}>{col.label}</SelectItem>
                ))}
            </Select>
            <Input
                label="Текст якоря"
                placeholder="Значение, которое нужно найти"
                value={point?.text ?? ""}
                onValueChange={handleTextChange}
                description={label === "Стартовый якорь" ? "Строка с этим текстом будет пропущена, следующие — захвачены" : "Обработка остановится на строке с этим текстом"}
            />
        </div>
    );
};

export const AnchorConfig = ({ settings, onUpdate, prevContext }: AnchorConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const rowCount = prevContext?.rows.length ?? 0;

    // Build column list from previous context headers
    const columns = headers.length > 0
        ? headers.map((h, i) => ({ label: h || `Колонка ${i + 1}`, value: String(i) }))
        : Array.from({ length: Math.max(rowCount > 0 ? prevContext!.rows[0].cells.length : 0, 1) }, (_, i) => ({
            label: `Колонка ${i + 1}`,
            value: String(i),
        }));

    return (
        <div className="flex flex-col gap-6">
            <AnchorPointEditor
                label="Стартовый якорь"
                point={settings?.start ?? null}
                columns={columns}
                onChange={(start) => onUpdate?.({ start })}
            />
            <AnchorPointEditor
                label="Конечный якорь"
                point={settings?.end ?? null}
                columns={columns}
                onChange={(end) => onUpdate?.({ end })}
            />

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-[11px] text-blue-700 leading-relaxed">
                    Якоря ограничивают диапазон строк для обработки. Если задан только стартовый — данные захватываются от него до конца.
                    Если заданы оба — каждый диапазон между якорями экспортируется отдельной таблицей.
                </p>
            </div>
        </div>
    );
};
