import { Settings2 } from "lucide-react";

export const NoSettingsState = () => (
    <div className="bg-default-50 rounded-2xl p-12 flex flex-col items-center justify-center border-2 border-dashed border-default-200">
        <Settings2 size={48} className="text-default-200 mb-4" />
        <p className="text-default-400 text-sm">
            Для этого слоя нет дополнительных настроек
        </p>
    </div>
);