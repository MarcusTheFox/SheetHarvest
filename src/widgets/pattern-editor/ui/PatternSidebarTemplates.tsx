"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { useTemplateStore } from "@/entities/template/model/store";
import { TemplateSaveForm } from "@/widgets/spreadsheet-view/ui/TemplateSaveForm";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { Trash2, Clock } from "lucide-react";
import { useShallow } from "zustand/shallow";

export const PatternSidebarTemplates = () => {
    const { templates, removeTemplate } = useTemplateStore(
        useShallow(s => ({
            templates: s.templates,
            removeTemplate: s.removeTemplate,
        }))
    );

    const loadPattern = usePatternStore(s => s.loadPattern);

    return (
        <div className="flex flex-col gap-4">
            <TemplateSaveForm />

            <Divider />

            {/* Список сохраненных */}
            <div className="flex flex-col gap-2">
                {templates.map((t) => (
                    <Card key={t.id} shadow="none" className="border border-default-100 hover:border-primary-200 transition-all group">
                        <CardBody className="p-3">
                            <div className="flex justify-between items-start gap-2">
                                <div
                                    className="flex-1 cursor-pointer min-w-0"
                                    onClick={() => loadPattern(t.config)}
                                >
                                    <h4 className="text-xs font-bold truncate group-hover:text-primary transition-colors">{t.name}</h4>
                                    <div className="flex items-center gap-1 text-[9px] text-default-400 mt-1">
                                        <Clock size={10} />
                                        {new Date(t.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <Button
                                    isIconOnly size="sm" variant="light" color="danger"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    onPress={() => removeTemplate(t.id)}
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}

                {templates.length === 0 && (
                    <div className="text-center py-8 text-default-400 text-xs italic">
                        У вас пока нет сохраненных шаблонов
                    </div>
                )}
            </div>
        </div>
    );
};