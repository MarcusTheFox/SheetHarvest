import { Layers } from "lucide-react";

export const EmptyLayerState = () => (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-default-50/30">
        <div className="w-16 h-16 bg-white border-2 border-dashed border-default-200 rounded-full flex items-center justify-center mb-4">
            <Layers className="text-default-200" size={ 32 } />
        </div>

        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
            Слой не выбран
        </h3>

        <p className="max-w-60 text-xs text-slate-400 leading-relaxed">
            Выберите шаг из списка пайплайна слева, чтобы изменить его параметры
        </p>
    </div>
);
