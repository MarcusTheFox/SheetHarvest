import { Button, Chip } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { LayerMetadata } from "@/features/run-extraction/lib/pipeline/types";

interface LayerSettingsHeaderProps {
    metadata: LayerMetadata<unknown>;
    index: number;
    onRemove: (index: number) => void;
}

export const LayerSettingsHeader = ({ metadata, index, onRemove }: LayerSettingsHeaderProps) => (
    <div className="p-8 border-b border-default-100">
        <div className="flex items-start justify-between mb-4 gap-4">
            <div className="flex flex-col gap-1 min-w-0">
                <h3 className="text-2xl font-bold text-default-800 truncate">{metadata.name}</h3>
                <p className="text-default-500 max-w-2xl text-sm leading-relaxed">{metadata.description}</p>
            </div>
            {!metadata.isSystem && (
                <Button 
                    color="danger" 
                    variant="flat" 
                    className="shrink-0 font-semibold"
                    startContent={<Trash2 size={18} />} 
                    onPress={() => onRemove(index)}
                >
                    Удалить
                </Button>
            )}
        </div>
        <div className="flex gap-2">
            {metadata.isSystem && (
                <Chip size="sm" color="primary" variant="flat" className="font-bold uppercase text-[9px]">Системный</Chip>
            )}
            <Chip size="sm" variant="flat" className="font-bold uppercase text-[9px] font-mono">ID: {metadata.id}</Chip>
        </div>
    </div>
);