import { Group, Panel } from "react-resizable-panels";
import { Separator } from "@/shared/ui/Separator";
import { SpreadsheetTable } from "./SpreadsheetTable";
import { PreviewTable } from "@/widgets/preview-view/ui/PreviewTable";
import { useSelectedLayer } from "../lib/useSelectedLayer";
import { Card, CardHeader } from "@heroui/card";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export const WorkspaceTableArea = () => {
    const { selectedLayerIndex, inputContext, outputContext } = useSelectedLayer();

    if (selectedLayerIndex === undefined) {
        return (
            <Group orientation="vertical" className="gap-0.5">
                <Panel>
                    <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                        <CardHeader className={clsx(
                            "rounded-none bg-slate-200",
                            "text-[10px] font-extrabold text-slate-500 uppercase",
                            "py-2 flex items-center",
                        )}>
                            <ChevronRight size={16} className="text-slate-500" />
                            Исходные данные
                        </CardHeader>
                        <SpreadsheetTable context={inputContext} />
                    </Card>
                </Panel>
            </Group>
        )
    }

    return (
        <Group orientation="vertical" className="gap-0.5">
            <Panel
                minSize="10%"
                defaultSize="50%"
            >
                <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                    <CardHeader className={clsx(
                        "rounded-none bg-slate-200",
                        "text-[10px] font-extrabold text-slate-500 uppercase",
                        "py-2 flex items-center",
                    )}>
                        <ChevronRight size={16} className="text-slate-500" />
                        Данные на входе
                    </CardHeader>
                    <SpreadsheetTable context={inputContext} />
                </Card>
            </Panel>
            <Separator className="h-1" />
            <Panel
                minSize="10%"
                defaultSize="50%"
            >
                <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                    <CardHeader className={clsx(
                        "rounded-none bg-slate-200",
                        "text-[10px] font-extrabold text-slate-500 uppercase",
                        "py-2 flex items-center",
                    )}>
                        <ChevronRight size={16} className="text-slate-500" />
                        Данные на выходе
                    </CardHeader>
                    <SpreadsheetTable context={outputContext} />
                    {/* <PreviewTable /> */}
                </Card>
            </Panel>
        </Group>
    )
}