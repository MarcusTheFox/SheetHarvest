"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { LayerSettingsPanel } from "./layer-settings/LayerSettingsPanel";
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { memo, useState, useCallback, useEffect } from "react";
import { PipelineEditorHeader } from "./PipelineEditorHeader";
import { PipelineEditorSidebar } from "./PipelineEditorSidebar";
import { PipelineEditorFooter } from "./PipelineEditorFooter";
import { useShallow } from "zustand/shallow";

interface PipelineEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onApply?: () => void;
    initialSelectedIndex?: number | null;
}

export const PipelineEditor = memo(({ isOpen, onClose, onApply, initialSelectedIndex = null }: PipelineEditorProps) => {
    const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(initialSelectedIndex);

    useEffect(() => {
        if (isOpen) {
            setSelectedLayerIndex(initialSelectedIndex);
        }
    }, [isOpen, initialSelectedIndex]);

    const { pipeline, removeLayer, moveLayer, addLayer } = usePatternStore(
        useShallow(s => ({
            pipeline: s.pipeline,
            removeLayer: s.removeLayer,
            moveLayer: s.moveLayer,
            addLayer: s.addLayer,
        }))
    );

    const handleApply = useCallback(() => {
        onApply?.();
        onClose();
    }, [onApply, onClose]);

    const handleRemove = useCallback((index: number) => {
        removeLayer(index);
        setSelectedLayerIndex(null);
    }, [removeLayer]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="full"
            classNames={{
                base: "bg-default-50",
                wrapper: "z-[100]",
                backdrop: "z-[99]"
            }}
            motionProps={{
                variants: {
                    enter: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
                    exit: { y: 20, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
                }
            }}
        >
            <ModalContent>
                <ModalHeader className="bg-white border-b border-default-200 py-4 px-6 flex justify-between items-center">
                    <PipelineEditorHeader onClose={onClose} />
                </ModalHeader>

                <ModalBody className="p-0 flex flex-row h-full overflow-hidden">
                    <PipelineEditorSidebar 
                        pipeline={pipeline}
                        selectedIndex={selectedLayerIndex}
                        onSelect={setSelectedLayerIndex}
                        onMove={moveLayer}
                        onAdd={addLayer}
                    />

                    <div className="flex-1 flex flex-col bg-white">
                        <LayerSettingsPanel 
                            selectedEntry={selectedLayerIndex !== null ? pipeline[selectedLayerIndex] : null}
                            selectedIndex={selectedLayerIndex}
                            onRemove={handleRemove}
                        />
                    </div>
                </ModalBody>

                <ModalFooter className="bg-white border-t border-default-200 px-6 py-4">
                    <PipelineEditorFooter 
                        onClose={onClose} 
                        onApply={handleApply} 
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

PipelineEditor.displayName = "PipelineEditor";