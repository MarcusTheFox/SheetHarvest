import { Group } from "react-resizable-panels";
import { Separator } from "@/shared/ui/Separator";
import { SpreadsheetTableContainer } from "./SpreadsheetTable";
import { useSelectedLayer } from "../lib/useSelectedLayer";
import { SpacePanel } from "./SpacePanel";

export const WorkspaceTableArea = () => {
    const { selectedLayerIndex, inputContext, outputContext } = useSelectedLayer();

    if (selectedLayerIndex === undefined) {
        return (
            <Group orientation="vertical" className="gap-0.5">
                <SpacePanel minSize={32} hideWrapper title="Исходные данные">
                    <SpreadsheetTableContainer context={inputContext} showGroupSeparator />
                </SpacePanel>
            </Group>
        )
    }

    return (
        <Group orientation="vertical" className="gap-0.5">
            <SpacePanel minSize={32} defaultSize="50" hideWrapper title="Данные на входе">
                <SpreadsheetTableContainer context={inputContext} showGroupSeparator />
            </SpacePanel>
            <Separator className="h-1" />
            <SpacePanel minSize={32} hideWrapper title="Данные на выходе">
                <SpreadsheetTableContainer context={outputContext} showGroupSeparator />
            </SpacePanel>
        </Group>
    )
}