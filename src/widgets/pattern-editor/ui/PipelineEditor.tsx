"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { LAYER_REGISTRY } from "@/features/run-extraction/lib/pipeline/registry";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Button, Card, CardBody, Divider, ScrollShadow,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@heroui/react";
import {
    ArrowLeft, Layers, Play, Settings2, Trash2, GripVertical,
    ChevronRight, PlusCircle, ArrowUp, ArrowDown
} from "lucide-react";
import { memo, useState } from "react";
import { ValueMappingConfig } from "./layers/ValueMappingConfig";

interface PipelineEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onApply?: () => void;
}

export const PipelineEditor = memo(({ isOpen, onClose, onApply }: PipelineEditorProps) => {
    const { pipeline, removeLayer, moveLayer, addLayer, updateLayerSettings } = usePatternStore();
    const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);

    const selectedEntry = selectedLayerIndex !== null ? pipeline[selectedLayerIndex] : null;
    const selectedMetadata = selectedEntry ? LAYER_REGISTRY[selectedEntry.id] : null;

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
                    <div className="flex items-center gap-4">
                        <Button isIconOnly variant="light" onPress={onClose}>
                            <ArrowLeft />
                        </Button>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Layers className="text-primary" />
                                Конструктор пайплайна обработки
                            </h2>
                            <p className="text-xs text-default-500 font-normal">Настройте последовательность трансформации данных</p>
                        </div>
                    </div>
                </ModalHeader>

                <ModalBody className="p-0 flex flex-row h-full overflow-hidden">
                    {/* Левая панель: Список слоев */}
                    <div className="w-1/3 border-r border-default-200 bg-white flex flex-col">
                        <div className="p-4 bg-default-50/50 border-b border-default-100 flex items-center justify-between">
                            <span className="italic text-[11px] text-default-500">Данные проходят через слои сверху вниз. Порядок имеет значение.</span>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button size="sm" color="primary" variant="flat" startContent={<PlusCircle size={16} />}>
                                        Добавить слой
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Add available layer"
                                    onAction={(key) => addLayer(key as string)}
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
                            {pipeline.map((entry, index) => {
                                const metadata = LAYER_REGISTRY[entry.id];
                                const isSelected = selectedLayerIndex === index;

                                return (
                                    <div key={entry.instanceId} className="flex items-center gap-2 group">
                                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                className="h-6 w-6 min-w-0"
                                                isDisabled={index === 0}
                                                onPress={() => {
                                                    moveLayer(index, index - 1);
                                                    if (isSelected) setSelectedLayerIndex(index - 1);
                                                }}
                                            >
                                                <ArrowUp size={14} />
                                            </Button>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                className="h-6 w-6 min-w-0"
                                                isDisabled={index === pipeline.length - 1}
                                                onPress={() => {
                                                    moveLayer(index, index + 1);
                                                    if (isSelected) setSelectedLayerIndex(index + 1);
                                                }}
                                            >
                                                <ArrowDown size={14} />
                                            </Button>
                                        </div>

                                        <Card
                                            isPressable
                                            onPress={() => setSelectedLayerIndex(index)}
                                            shadow="none"
                                            className={`flex-1 border-2 transition-all ${isSelected
                                                ? "border-primary bg-primary-50/30"
                                                : "border-default-100 hover:border-default-300"
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
                            })}
                        </ScrollShadow>
                    </div>

                    {/* Правая панель: Настройки выбранного слоя */}
                    <div className="flex-1 flex flex-col bg-white">
                        {selectedEntry && selectedMetadata ? (
                            <div className="flex flex-col h-full">
                                <div className="p-8 border-b border-default-100">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-2xl font-bold text-default-800">{selectedMetadata.name}</h3>
                                            <p className="text-default-500 max-w-2xl">{selectedMetadata.description}</p>
                                        </div>
                                        {!selectedMetadata.isSystem && (
                                            <Button
                                                color="danger"
                                                variant="flat"
                                                startContent={<Trash2 size={18} />}
                                                onPress={() => {
                                                    removeLayer(selectedLayerIndex!);
                                                    setSelectedLayerIndex(null);
                                                }}
                                            >
                                                Удалить слой
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        {selectedMetadata.isSystem && (
                                            <Chip size="sm" color="primary" variant="flat" className="font-bold uppercase text-[9px]">Системный</Chip>
                                        )}
                                        <Chip size="sm" variant="flat" className="font-bold uppercase text-[9px] font-mono">ID: {selectedEntry.id}</Chip>
                                    </div>
                                </div>

                                <ScrollShadow className="flex-1 p-8">
                                    <div className="max-w-3xl">
                                        <div className="flex items-center gap-3 mb-6 text-default-400">
                                            <Settings2 size={20} />
                                            <h4 className="font-bold uppercase tracking-widest text-xs">Настройки параметров</h4>
                                        </div>

                                        {selectedEntry.id === 'value-mapping' ? (
                                            <ValueMappingConfig
                                                index={selectedLayerIndex!}
                                                settings={selectedEntry.settings}
                                            />
                                        ) : (
                                            /* Здесь будет рендериться специфичная форма настроек для каждого слоя */
                                            <div className="bg-default-50 rounded-2xl p-12 flex flex-col items-center justify-center border-2 border-dashed border-default-200">
                                                <Settings2 size={48} className="text-default-200 mb-4" />
                                                <p className="text-default-400 text-sm">Для этого слоя пока нет дополнительных настроек</p>
                                            </div>
                                        )}
                                    </div>
                                </ScrollShadow>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-default-300 p-12 text-center">
                                <div className="bg-default-50 p-8 rounded-full mb-6">
                                    <Layers size={64} className="opacity-20" />
                                </div>
                                <h3 className="text-xl font-bold text-default-400 mb-2">Слой не выбран</h3>
                                <p className="max-w-xs text-sm">Выберите слой из списка слева, чтобы просмотреть его детали или изменить параметры</p>
                            </div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter className="bg-white border-t border-default-200 px-6 py-4">
                    <Button variant="light" onPress={onClose}>Закрыть</Button>
                    <Button
                        color="primary"
                        className="font-bold shadow-lg shadow-primary-200"
                        startContent={<Play size={18} />}
                        onPress={() => {
                            onApply?.();
                            onClose();
                        }}
                    >
                        Применить и запустить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

PipelineEditor.displayName = "PipelineEditor";

const Chip = ({ children, color, variant, className }: any) => (
    <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${className} ${variant === 'flat' ? (color === 'primary' ? 'bg-primary-50 text-primary' : 'bg-default-100 text-default-600') : ''
        }`}>
        {children}
    </div>
);
