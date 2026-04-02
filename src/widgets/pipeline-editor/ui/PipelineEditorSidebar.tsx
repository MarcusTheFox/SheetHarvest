import { ScrollShadow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { PlusCircle } from "lucide-react";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { PipelineLayer } from "@/entities/pattern/model/types";
import { PipelineLayerCard } from "./PipelineLayerCard";

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
                <Dropdown>
                    <DropdownTrigger>
                        <Button size="sm" color="primary" variant="flat" startContent={<PlusCircle size={16} />}>
                            Добавить
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu 
                        aria-label="Add available layer" 
                        onAction={(key) => onAdd(key as string)}
                    >
                        {Object.values(LAYER_REGISTRY)
                            .filter(l => !l.isSystem || !pipeline.some(p => p.id === l.id))
                            .map(l => (
                                <DropdownItem key={l.id} description={l.description}>
                                    {l.name}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
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