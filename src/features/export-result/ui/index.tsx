"use client";

import { Button, Divider, Input } from "@heroui/react";
import { RotateCcw, Archive } from "lucide-react";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { ExportSingle } from "./ExportSingle";
import { useExport } from "../model/useExport";

interface ExportPanelProps {
    selectedTableId: string;
    customNames: Record<string, string>;
    onRename: ( id: string, name: string ) => void;
    onReset: ( id: string ) => void;
}

export const ExportPanel = ({ selectedTableId, customNames, onRename, onReset }: ExportPanelProps ) => {
    const results = useExtractionStore(( s ) => s.results );
    const headers = useExtractionStore(( s ) => s.headers );

    const { exportTable, exportAll } = useExport();

    const selectedTable = results.find(( t ) => t.id === selectedTableId );
    const currentName = selectedTable ? ( customNames[selectedTable.id] ?? selectedTable.name ) : "";

    if ( !selectedTable ) return null;

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                            Имя при экспорте
                        </label>

                        { customNames[selectedTable.id] !== undefined && (
                            <button
                                className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-1 font-bold"
                                onClick={ () => onReset( selectedTable.id ) }
                            >
                                <RotateCcw size={ 10 } />
                                { " " }
                                Сброс
                            </button>
                        ) }
                    </div>

                    <Input
                        classNames={{
                            input: "font-bold text-slate-700! text-xs",
                            inputWrapper: "px-3 border-1 border-slate-200",
                        }}
                        radius="sm"
                        size="sm"
                        value={ currentName }
                        variant="bordered"
                        onValueChange={ ( value ) => onRename( selectedTable.id, value ) }
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        Скачать выбранную
                    </label>

                    <div className="flex gap-1">
                        <ExportSingle label="XLSX" onClick={ () => exportTable( selectedTable, headers, currentName, "xlsx" ) } />
                        <ExportSingle label="CSV" onClick={ () => exportTable( selectedTable, headers, currentName, "csv" ) } />
                        <ExportSingle label="JSON" onClick={ () => exportTable( selectedTable, headers, currentName, "json" ) } />
                    </div>
                </div>
            </div>

            <Divider className="bg-slate-100" />

            <div className="p-4 mt-auto">
                <Button
                    fullWidth
                    className="text-xs font-bold uppercase"
                    color="primary"
                    radius="sm"
                    size="lg"
                    onPress={ () => exportAll( results, headers, customNames ) }
                >
                    <Archive size={ 16 } />
                    Экспортировать всё (XLSX)
                </Button>
            </div>
        </div>
    );
};
