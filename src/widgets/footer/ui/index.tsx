"use client";

import { useExtractionStore } from "@/entities/extraction/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import clsx from "clsx";
import { FileText, Database } from "lucide-react";

export const PageFooter = () => {
    const file = useSpreadsheetStore(( s ) => s.file );
    const sourceLength = useSpreadsheetStore(( s ) => s.sheets.length );
    const isExtracted = useExtractionStore((s) => s.isExtracted);
    const resultLength = useExtractionStore((s) => s.results.length);

    const sheetsLength = isExtracted ? resultLength : sourceLength;

    return (
        <footer className="h-6 px-3 bg-slate-800 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <FileText className="text-slate-400" size={ 12 } />
                    <span className="text-[10px] text-slate-200 font-mono font-medium tracking-tight">
                        { file?.name ?? "Файл не загружен" }
                    </span>
                    { file && (
                        <span className="text-[9px] text-slate-400 font-mono ml-1">
                            ({ (file.size / 1024).toFixed(1) } KB)
                        </span>
                    ) }
                </div>

                { !!file && 
                    <div className={clsx(
                        "flex items-center gap-4",
                        "text-[10px] font-bold uppercase tracking-widest text-slate-400",
                        "border-l border-slate-600 pl-4"
                    )}>
                        <div className="flex items-center gap-1">
                            <Database size={ 12 } />
                            Таблиц: <span className="text-slate-200">{ sheetsLength }</span>
                        </div>
                    </div>
                }
            </div>
        </footer>
    );
};
