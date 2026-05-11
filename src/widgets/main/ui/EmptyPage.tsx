import { useFileImport } from "@/features/upload-spreadsheet/lib/useFileImport";
import { FileUp } from "lucide-react";
import { useRef } from "react";

export const EmptyPage = () => {
    const { importFile } = useFileImport();
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div 
            className="flex-1 self-center mx-auto max-w-3xl w-full h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 hover:bg-white hover:border-primary/50 transition-all group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) importFile(file);
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            <input 
                ref={fileInputRef} 
                type="file" 
                className="hidden" 
                accept=".xlsx,.xls,.csv" 
                onChange={(e) => e.target.files?.[0] && importFile(e.target.files[0])} 
            />
            
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                <FileUp className="text-slate-300 group-hover:text-primary" size={40} />
            </div>

            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                Перетащите файл сюда
            </h3>
            
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mb-8">
                или нажмите для выбора на компьютере
            </p>

            <div className="flex gap-4">
                {['XLSX', 'CSV', 'XLS'].map(ext => (
                    <div key={ext} className="px-3 py-1 bg-slate-100 rounded text-[9px] font-mono font-bold text-slate-400 border border-slate-200">
                        {ext}
                    </div>
                ))}
            </div>
        </div>
    );
};