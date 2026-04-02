import { Card, CardBody, Button } from "@heroui/react";
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import { PipelineLayer } from "@/entities/pattern/model/types";

interface PipelineLayerCardProps {
    entry: PipelineLayer;
    index: number;
    isSelected: boolean;
    isFirst: boolean;
    isLast: boolean;
    onSelect: (index: number) => void;
    onMove: (from: number, to: number) => void;
}

export const PipelineLayerCard = ({ 
    entry, index, isSelected, isFirst, isLast, onSelect, onMove 
}: PipelineLayerCardProps) => {
    const metadata = LAYER_REGISTRY[entry.id];

    return (
        <div className="flex items-center gap-2 group">
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    isIconOnly size="sm" variant="light" className="h-6 w-6 min-w-0"
                    isDisabled={isFirst}
                    onPress={() => onMove(index, index - 1)}
                >
                    <ArrowUp size={14} />
                </Button>
                <Button
                    isIconOnly size="sm" variant="light" className="h-6 w-6 min-w-0"
                    isDisabled={isLast}
                    onPress={() => onMove(index, index + 1)}
                >
                    <ArrowDown size={14} />
                </Button>
            </div>

            <Card
                isPressable
                onPress={() => onSelect(index)}
                shadow="none"
                className={`flex-1 border-2 transition-all ${
                    isSelected ? "border-primary bg-primary-50/30" : "border-default-100 hover:border-default-300"
                }`}
            >
                <CardBody className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-primary bg-primary-100/50 px-1.5 rounded">
                                    #{index + 1}
                                </span>
                                <h3 className="font-bold text-sm truncate">{metadata?.name}</h3>
                            </div>
                            <p className="text-[11px] text-default-500 line-clamp-1">{metadata?.description}</p>
                        </div>
                        <ChevronRight size={18} className={isSelected ? "text-primary" : "text-default-300"} />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};