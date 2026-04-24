import { PatternSidebar } from "@/widgets/pattern-editor/ui/PatternSidebar";
import { ChevronRight } from "lucide-react";
import { Group, Panel } from "react-resizable-panels";
import { Card, CardBody, CardHeader } from "@heroui/card";
import clsx from "clsx";
import { Separator } from "@/shared/ui/Separator";
import { WorkspaceTableArea } from "./WorkspaceTableArea";
import { LayerSettingsPanel } from "@/widgets/pipeline-editor/ui/layer-settings/LayerSettingsPanel";
import { useSelectedLayer } from "../lib/useSelectedLayer";
import { PatternSidebarTemplates } from "@/widgets/pattern-editor/ui/PatternSidebarTemplates";
import { PatternSidebarPipeline } from "@/widgets/pattern-editor/ui/PatternSidebarPipeline";

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
                <Group orientation="vertical" className="gap-0.5">
                    <Panel minSize={32}>
                        <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                            <CardHeader className={clsx(
                                "rounded-none bg-slate-200",
                                "text-[10px] font-extrabold text-slate-500 uppercase",
                                "py-2 flex items-center",
                            )}>
                                <ChevronRight size={16} className="text-slate-500" />
                                Шаблон
                            </CardHeader>
                            <CardBody className="overflow-auto">
                                <PatternSidebarPipeline />
                            </CardBody>
                        </Card>
                    </Panel>
                    <Separator className="h-1" />
                    <Panel minSize={32} defaultSize="50">
                        <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                            <CardHeader className={clsx(
                                "rounded-none bg-slate-200",
                                "text-[10px] font-extrabold text-slate-500 uppercase",
                                "py-2 flex items-center",
                            )}>
                                <ChevronRight size={16} className="text-slate-500" />
                                Сохраненные шаблоны
                            </CardHeader>
                            <CardBody className="overflow-auto">
                                <PatternSidebarTemplates />
                            </CardBody>
                        </Card>
                    </Panel>
                </Group>
            </Panel>
            <Separator className="w-1" />
            <Panel>
                <WorkspaceTableArea />
            </Panel>
            <Separator className="w-1" />
            <Panel defaultSize="20">
                <Group orientation="vertical">
                    <Panel>
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
                            />
                        </Card>
                    </Panel>
                </Group>
            </Panel>
        </Group>
    )
}