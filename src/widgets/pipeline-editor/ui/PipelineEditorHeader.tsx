import { Button } from "@heroui/react";
import { ArrowLeft, Layers } from "lucide-react";

interface PipelineEditorHeaderProps {
    onClose: () => void;
}

export function PipelineEditorHeader({ onClose }: PipelineEditorHeaderProps) {
    return (
        <div className="flex items-center gap-4">
            <Button isIconOnly variant="light" onPress={onClose}>
                <ArrowLeft />
            </Button>
            <div className="flex flex-col">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Layers className="text-primary" />
                    Конструктор пайплайна
                </h2>
                <p className="text-xs text-default-500 font-normal">Последовательность трансформации данных</p>
            </div>
        </div>
    );
}