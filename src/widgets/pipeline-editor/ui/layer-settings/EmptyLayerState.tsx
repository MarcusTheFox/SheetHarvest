import { Layers } from "lucide-react";

export const EmptyLayerState = () => (
    <div className="flex-1 flex flex-col items-center justify-center text-default-300 p-12 text-center">
        <div className="bg-default-50 p-8 rounded-full mb-6">
            <Layers size={64} className="opacity-20" />
        </div>
        <h3 className="text-xl font-bold text-default-400 mb-2">Слой не выбран</h3>
        <p className="max-w-xs text-sm text-default-400">
            Выберите слой из списка слева, чтобы просмотреть его детали или изменить параметры
        </p>
    </div>
);