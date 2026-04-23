import { PatternSidebar } from "@/widgets/pattern-editor/ui/PatternSidebar";
import { ChevronRight } from "lucide-react";
import { Group, Panel } from "react-resizable-panels";
import { Card, CardHeader } from "@heroui/card";
import clsx from "clsx";
import { Separator } from "@/shared/ui/Separator";
import { WorkspaceTableArea } from "./WorkspaceTableArea";
import { LayerSettingsPanel } from "@/widgets/pipeline-editor/ui/layer-settings/LayerSettingsPanel";
import { useSelectedLayer } from "../lib/useSelectedLayer";

export const Workspace = () => {
    const { selectedLayerIndex, selectedLayer } = useSelectedLayer();

    return (
        <Group orientation="horizontal" className="gap-0.5">
            <Panel
                maxSize={400}
                minSize={400}
                defaultSize={400}
                disabled
            >
                <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                    <CardHeader className={clsx(
                        "rounded-none bg-slate-200",
                        "text-[10px] font-extrabold text-slate-500 uppercase",
                        "py-2 flex items-center",
                    )}>
                        <ChevronRight size={16} className="text-slate-500" />
                        Паттерн
                    </CardHeader>
                    <PatternSidebar />
                </Card>
            </Panel>
            <Separator className="w-1" />
            <Panel>
                <WorkspaceTableArea />
            </Panel>
            <Separator className="w-1" />
            <Panel defaultSize="20">
                <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                    <CardHeader className={clsx(
                        "rounded-none bg-slate-200",
                        "text-[10px] font-extrabold text-slate-500 uppercase",
                        "py-2 flex items-center",
                    )}>
                        <ChevronRight size={16} className="text-slate-500" />
                        Настройки
                    </CardHeader>
                    <LayerSettingsPanel
                        selectedEntry={selectedLayer ?? null}
                        selectedIndex={selectedLayerIndex ?? null}
                        onRemove={() => {}}
                    />
                </Card>
            </Panel>
        </Group>
    )
}