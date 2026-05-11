import { Chip } from "@heroui/react";
import { LayerMetadata } from "@/shared/types/layer";

interface LayerSettingsHeaderProps {
    metadata: LayerMetadata<unknown>;
}

export const LayerSettingsHeader = ({ metadata }: LayerSettingsHeaderProps ) => (
    <div className="p-6 border-b border-default-100 bg-white">
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    Настройки функции
                </label>

                <div className="flex gap-2">
                    { metadata.isSystem && (
                        <Chip className="font-bold uppercase text-[9px] h-5" color="primary" size="sm" variant="flat">
                            Системный
                        </Chip>
                    ) }

                    <Chip className="font-bold uppercase text-[9px] h-5 font-mono bg-default-100 text-default-500" size="sm" variant="flat">
                        ID: { metadata.id }
                    </Chip>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-slate-700 tracking-tight leading-none">
                    { metadata.name }
                </h3>

                <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                    { metadata.description }
                </p>
            </div>
        </div>
    </div>
);
