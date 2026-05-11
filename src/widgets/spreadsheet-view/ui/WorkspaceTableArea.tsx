import { Group } from "react-resizable-panels";
import { Separator } from "@/shared/ui/Separator";
import { SpreadsheetTableContainer } from "./SpreadsheetTable";
import { useSelectedLayer } from "../lib/useSelectedLayer";
import { SpacePanel } from "./SpacePanel";

export const WorkspaceTableArea = () => {
    const { selectedLayerIndex, inputContext, outputContext } = useSelectedLayer();

    if ( selectedLayerIndex === undefined ) {
        return (
            <Group className="gap-0.5" orientation="vertical">
                <SpacePanel hideWrapper minSize={ 32 } title="Исходные данные">
                    <SpreadsheetTableContainer showGroupSeparator context={ inputContext } />
                </SpacePanel>
            </Group>
        );
    }

    return (
        <Group className="gap-0.5" orientation="vertical">
            <SpacePanel hideWrapper defaultSize="50" minSize={ 32 } title="Данные на входе">
                <SpreadsheetTableContainer showGroupSeparator context={ inputContext } />
            </SpacePanel>

            <Separator className="h-1" />

            <SpacePanel hideWrapper minSize={ 32 } title="Данные на выходе">
                <SpreadsheetTableContainer showGroupSeparator context={ outputContext } />
            </SpacePanel>
        </Group>
    );
};
