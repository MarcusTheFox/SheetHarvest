import { ScrollShadow, Button } from "@heroui/react";
import { PlusCircle } from "lucide-react";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { PipelineLayerCard } from "./PipelineLayerCard";
import { SearchSelectPopover } from "@/shared/ui/SearchSelectPopover";
import { useMemo } from "react";

interface PipelineEditorSidebarProps {
    pipeline: PipelineLayer[];
    selectedIndex: number | null;
    onSelect: (index: number) => void;
    onMove: (from: number, to: number) => void;
    onAdd: (id: string) => void;
}

export const PipelineEditorSidebar = ({ 
    pipeline, selectedIndex, onSelect, onMove, onAdd 
}: PipelineEditorSidebarProps) => {
    return (
        <div className="w-1/3 border-r border-default-200 bg-white flex flex-col">
            <div className="p-4 bg-default-50/50 border-b border-default-100 flex items-center justify-between">
                <span className="italic text-[11px] text-default-500 font-medium">Слои выполняются сверху вниз</span>
                <SearchSelectPopover
                    items={useMemo(() => Object.values(LAYER_REGISTRY)
                        .filter(l => !l.isSystem || !pipeline.some(p => p.id === l.id))
                        .map(l => ({ id: l.id, name: l.name, description: l.description })), 
                        [pipeline]
                    )}
                    onSelect={onAdd}
                    placeholder="Поиск слоя..."
                    label="Добавить слой"
                    trigger={
                        <Button size="sm" color="primary" variant="flat" startContent={<PlusCircle size={16} />}>
                            Добавить
                        </Button>
                    }
                    classNames={{
                        content: "w-90",
                        scrollShadow: "max-h-100"
                    }}
                />
            </div>
            
            <ScrollShadow className="flex-1 p-4 flex flex-col gap-3">
                {pipeline.map((entry, index) => (
                    <PipelineLayerCard
                        key={entry.instanceId}
                        entry={entry}
                        index={index}
                        isSelected={selectedIndex === index}
                        isFirst={index === 0}
                        isLast={index === pipeline.length - 1}
                        onSelect={onSelect}
                        onMove={onMove}
                    />
                ))}
            </ScrollShadow>
        </div>
    );
};