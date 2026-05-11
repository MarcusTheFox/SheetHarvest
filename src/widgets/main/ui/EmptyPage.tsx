import { useFileImport } from "@/features/upload-spreadsheet/lib/useFileImport";
import clsx from "clsx";
import { FileUp } from "lucide-react";
import { useRef, useState } from "react";

export const EmptyPage = () => {
    const { importFile } = useFileImport();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) await importFile(file);
    };

    return (
        <div className={clsx(
            "w-full h-full transition-all duration-300",
            isDragOver ? "p-1" : "p-5"
        )}>
            <div
                className={clsx(
                    "flex-1 self-center mx-auto w-full h-full",
                    "flex flex-col items-center justify-center",
                    "border-2 border-dashed rounded-3xl transition-all duration-300 group cursor-pointer relative",
                    isDragOver || "hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/5",
                    isDragOver
                        ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10"
                        : "border-slate-200 bg-white/50"
                )}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => e.target.files?.[0] && importFile(e.target.files[0])}
                />

                <div className={clsx(
                    "flex flex-col items-center pointer-events-none",
                )}>
                    <div className={clsx(
                        "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500",
                        "group-hover:bg-primary group-hover:text-white",
                        isDragOver ? "bg-primary text-white scale-120 shadow-lg" : "bg-slate-100 text-slate-300"
                    )}>
                        <FileUp size={40} strokeWidth={isDragOver ? 2.5 : 2} />
                    </div>

                    <div className="text-center">
                        <h3 className={clsx(
                            "text-sm font-black uppercase tracking-widest mb-2 transition-colors",
                            isDragOver ? "text-primary" : "text-slate-800"
                        )}>
                            {isDragOver ? "Бросайте файл сюда" : "Перетащите файл сюда"}
                        </h3>

                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mb-8">
                            или нажмите для выбора на компьютере
                        </p>
                    </div>
                </div>

                <div className={clsx(
                    "flex gap-4 transition-opacity duration-300 pointer-events-none",
                    isDragOver ? "opacity-0" : "opacity-100"
                )}>
                    {['XLSX', 'CSV', 'XLS'].map(ext => (
                        <div key={ext} className="px-3 py-1 bg-slate-50 rounded text-[10px] font-mono font-bold text-slate-500 border border-slate-300">
                            {ext}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};