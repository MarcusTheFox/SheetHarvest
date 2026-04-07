"use client";

import { Button, Select, SelectItem } from "@heroui/react";
import { Upload, FileText, X } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { ValueMappingLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type ValueMappingConfigProps = LayerConfigProps<ValueMappingLayerSettings>;

export const ValueMappingConfig = ({ settings, onUpdate, prevContext }: ValueMappingConfigProps) => {
    const headers = prevContext?.headers ?? [];
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

            const mapping: Record<string, string> = {};
            jsonData.forEach(row => {
                if (row[0] && row[1]) {
                    mapping[String(row[0]).trim()] = String(row[1]).trim();
                }
            });

            onUpdate?.({mapping});
        };
        reader.readAsArrayBuffer(file);
    };

    const availableCols = headers.map((h, i) => ({
        label: h || `Колонка ${i + 1}`,
        value: String(i)
    }));

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-default-700">1. Выберите колонку для сопоставления</h4>
                <Select
                    label="Целевая колонка"
                    placeholder="Выберите колонку со значениями"
                    selectedKeys={settings.sourceColIndex !== undefined ? [String(settings.sourceColIndex)] : []}
                    onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0];
                        onUpdate?.({sourceColIndex: Number(val)});
                    }}
                >
                    {availableCols.map((col) => (
                        <SelectItem key={col.value}>
                            {col.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-default-700">2. Загрузите справочник сопоставления (Excel/CSV)</h4>
                <div className="flex flex-col gap-2">
                    {!settings.mapping ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-default-200 rounded-2xl hover:bg-default-50 cursor-pointer transition-colors">
                            <Upload className="text-default-300 mb-2" size={32} />
                            <span className="text-xs text-default-500 font-medium">Нажмите для загрузки файла</span>
                            <span className="text-[10px] text-default-400 mt-1">Ожидается файл с двумя колонками: [Оригинал, Замена]</span>
                            <input type="file" className="hidden" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} />
                        </label>
                    ) : (
                        <div className="bg-success-50 border border-success-200 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-success-100 p-2 rounded-lg text-success-600">
                                    <FileText size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-success-700">Справочник загружен</span>
                                    <span className="text-[10px] text-success-600">{fileName || "Файл сопоставления"} ({Object.keys(settings.mapping).length} записей)</span>
                                </div>
                            </div>
                            <Button
                                isIconOnly size="sm" variant="light" color="danger"
                                onPress={() => { onUpdate?.({mapping: undefined}) }}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-primary-50 p-4 rounded-xl flex items-start gap-3">
                <div className="text-primary-500 mt-0.5 font-bold text-sm">💡</div>
                <p className="text-[11px] text-primary-700 leading-relaxed">
                    Слой будет автоматически заменять значения в выбранной колонке на соответствующие значения из справочника.
                </p>
            </div>
        </div>
    );
};
