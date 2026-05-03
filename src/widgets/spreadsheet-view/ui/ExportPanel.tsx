"use client";

import { Button, Divider } from "@heroui/react";
import { RotateCcw, Archive } from "lucide-react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { exportToExcel, exportToJSON, exportToCSV } from "@/shared/lib/export-utils";
import clsx from "clsx";

interface ExportPanelProps {
    selectedTableId: string | number;
    customNames: Record<string, string>;
    onRename: (id: string, name: string) => void;
    onReset: (id: string) => void;
}

export const ExportPanel = ({ selectedTableId, customNames, onRename, onReset }: ExportPanelProps) => {
    const { results, headers } = useExtractionStore();

    const selectedTable = results.find(t => t.id === selectedTableId);
    const currentName = selectedTable ? (customNames[selectedTable.id] ?? selectedTable.name) : "";

    const exportSingle = (format: 'xlsx' | 'json' | 'csv') => {
        if (!selectedTable) return;
        const name = currentName;
        const rows = selectedTable.rows.map(r => r.cells);

        if (format === 'xlsx') {
            exportToExcel([{ name, rows: [headers, ...rows] }], name);
        } else if (format === 'csv') {
            exportToCSV(rows, headers, name);
        } else if (format === 'json') {
            const json = rows.map(row => Object.fromEntries(headers.map((h, i) => [h || `col_${i}`, row[i]])));
            exportToJSON(json, name);
        }
    };

    const exportAll = () => {
        const sheets = results.map(t => ({
            name: customNames[t.id] ?? t.name,
            rows: [headers, ...t.rows.map(r => r.cells)]
        }));
        exportToExcel(sheets, "All_Results_Extractions");
    };

    if (!selectedTable) return null;

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-4 space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                            Имя при экспорте
                        </label>
                        {customNames[selectedTable.id] && (
                            <button
                                onClick={() => onReset(selectedTable.id)}
                                className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-1 font-bold"
                            >
                                <RotateCcw size={10} /> Сброс
                            </button>
                        )}
                    </div>
                    <input
                        type="text"
                        value={currentName}
                        onChange={(e) => onRename(selectedTable.id, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        Скачать выбранную
                    </label>
                    <div className="flex gap-1">
                        <ActionButton label="XLSX" onClick={() => exportSingle('xlsx')} />
                        <ActionButton label="CSV" onClick={() => exportSingle('csv')} />
                        <ActionButton label="JSON" onClick={() => exportSingle('json')} />
                    </div>
                </div>
            </div>

            <Divider className="bg-slate-100" />

            <div className="p-4 mt-auto">
                <Button
                    fullWidth
                    color="primary"
                    radius="sm"
                    size="lg"
                    className="text-xs font-bold uppercase"
                    onPress={exportAll}
                >
                    <Archive size={16} />
                    Экспортировать всё (XLSX)
                </Button>
            </div>
        </div>
    );
};

const ActionButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
    <Button
        onPress={onClick}
        radius="sm"
        className={clsx(
            "flex-1",
            "bg-white border border-slate-200",
            "hover:border-blue-500 hover:text-blue-600",
            "transition-all py-2.5",
            "text-[10px] font-bold uppercase tracking-tighter text-slate-600")}
    >
        {label}
    </Button>
);