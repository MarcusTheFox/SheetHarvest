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
        <div className="flex flex-row gap-2">
            <Input
                size="sm"
                radius="sm"
                variant="bordered"
                value={newTemplateName}
                placeholder="Название шаблона"
                isClearable
                classNames={{
                    input: "font-bold text-slate-700! text-xs placeholder:text-slate-500",
                    inputWrapper: "px-3 border-1 border-slate-300 hover:border-slate-400!",
                }}
                onValueChange={setNewTemplateName}
            />
            <Button
                size="sm"
                color="primary"
                variant="solid"
                isDisabled={!newTemplateName}
                startContent={<Save size={16} />}
                onPress={handleSave}
                isIconOnly
            />
        </div>
    )
}