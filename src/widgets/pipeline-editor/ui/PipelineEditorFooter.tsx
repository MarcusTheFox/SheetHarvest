import { Button } from "@heroui/react";
import { Play } from "lucide-react";

interface PipelineEditorFooterProps {
    onClose: () => void;
    onApply: () => void;
}

export function PipelineEditorFooter({ onClose, onApply }: PipelineEditorFooterProps) {
    return (
        <>
            <Button variant="light" onPress={onClose}>
                Закрыть
            </Button>
            <Button
                color="primary"
                className="font-bold shadow-lg shadow-primary-200"
                startContent={<Play size={18} />}
                onPress={onApply}
            >
                Применить и запустить
            </Button>
        </>
    );
}