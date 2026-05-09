import { Group, Panel } from "react-resizable-panels";
import { Separator } from "@/shared/ui/Separator";
import { WorkspaceTableArea } from "./WorkspaceTableArea";
import { LayerSettingsPanel } from "@/widgets/pipeline-editor/ui/layer-settings/LayerSettingsPanel";
import { PatternSidebarTemplates } from "@/widgets/pattern-editor/ui/PatternSidebarTemplates";
import { PatternSidebarPipeline } from "@/widgets/pattern-editor/ui/PatternSidebarPipeline";
import { SpacePanel } from "./SpacePanel";

export const Workspace = () => {
    return (
        <Group className="gap-0.5" orientation="horizontal">
            <Panel defaultSize={ 400 }>
                <Group className="gap-0.5" orientation="vertical">
                    <SpacePanel defaultSize="50" minSize={ 32 } title="Шаблон">
                        <PatternSidebarPipeline />
                    </SpacePanel>

                    <Separator className="h-1" />

                    <SpacePanel minSize={ 32 } title="Сохраненные шаблоны">
                        <PatternSidebarTemplates />
                    </SpacePanel>
                </Group>
            </Panel>

            <Separator className="w-1" />

            <Panel>
                <WorkspaceTableArea />
            </Panel>

            <Separator className="w-1" />

            <Panel defaultSize="20">
                <Group orientation="vertical">
                    <SpacePanel minSize={ 32 } title="Настройки">
                        <LayerSettingsPanel />
                    </SpacePanel>
                </Group>
            </Panel>
        </Group>
    );
};
