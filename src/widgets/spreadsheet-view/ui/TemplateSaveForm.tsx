import { usePatternStore } from "@/entities/pattern/model/store";
import { useTemplateStore } from "@/entities/template/model/store";
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Save } from "lucide-react"
import { useState } from "react";

export const TemplateSaveForm = () => {
    const addTemplate = useTemplateStore(s => s.addTemplate);

    const [newTemplateName, setNewTemplateName] = useState("");

    const handleSave = () => {
        if (!newTemplateName) return;

        const pipeline = usePatternStore.getState().pipeline;

        addTemplate({
            name: newTemplateName,
            config: { pipeline }
        });
        setNewTemplateName("");
    };

    return (
        <div className="flex flex-col gap-2 p-3 bg-default-50 rounded-2xl border border-default-200">
            <Input
                size="sm"
                label="Название шаблона"
                value={newTemplateName}
                onValueChange={setNewTemplateName}
            />
            <Button
                size="sm"
                color="primary"
                variant="solid"
                isDisabled={!newTemplateName}
                startContent={<Save size={16} />}
                onPress={handleSave}
            >
                Сохранить текущий
            </Button>
        </div>
    )
}