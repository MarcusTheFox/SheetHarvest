"use client";

import { useExtractionStore } from "@/entities/extraction/model/store";
import { Group, Panel } from "react-resizable-panels";
import { SpreadsheetTable } from "./SpreadsheetTable";
import { Separator } from "@/shared/ui/Separator";
import { useState } from "react";
import { ExportPanel } from "./ExportPanel";
import { SpacePanel } from "./SpacePanel";
import { ResultTableCard } from "./ResultTableCard";
import { TemplateSaveForm } from "./TemplateSaveForm";

export const ResultSpace = () => {
    const results = useExtractionStore(s => s.results);
    const headers = useExtractionStore(s => s.headers);

    const [ customNames, setCustomNames ] = useState<Record<string, string>>({});
    const [ selectedTableId, setSelectedTableId ] = useState( results[0]?.id );

    const selectedTable = results.find(( table ) => table.id === selectedTableId );

    const isEmpty = results.length === 0 || !selectedTable;

    const handleTableClick = ( id: string ) => {
        setSelectedTableId( id );
    };

    const handleRename = ( id: string, newName: string ) => {
        setCustomNames(( prev ) => ({ ...prev, [id]: newName }));
    };

    const handleResetName = ( id: string ) => {
        setCustomNames(( prev ) => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    const resultTables = results.map(( t ) => {
        const isSelected = selectedTableId === t.id;
        const displayName = customNames[t.id] ?? t.name;

        return (
            <ResultTableCard
                key={ t.id }
                displayName={ displayName }
                isSelected={ isSelected }
                table={ t }
                onSelect={ handleTableClick }
            />
        );
    });

    return (
        <Group className="gap-0.5" orientation="horizontal">
            <Panel defaultSize="20">
                <Group orientation="vertical">
                    <SpacePanel classNames={{ wrapper: "gap-1" }} title="Таблицы">
                        { resultTables }
                    </SpacePanel>
                </Group>
            </Panel>

            <Separator className="w-1" />

            <Panel>
                <Group orientation="vertical">
                    <SpacePanel hideWrapper
                        title={ isEmpty
                            ? "Результат"
                            : `Просмотр: ${ customNames[selectedTable.id] ?? selectedTable.name }` }
                    >
                        { !isEmpty && (
                            <SpreadsheetTable
                                headers={ headers }
                                tables={ [ selectedTable ] }
                            />
                        ) }
                    </SpacePanel>
                </Group>
            </Panel>

            <Separator className="w-1" />

            <Panel defaultSize="20">
                <Group className="gap-0.5" orientation="vertical">
                    <SpacePanel title="Экспорт">
                        <ExportPanel
                            customNames={ customNames }
                            selectedTableId={ selectedTableId }
                            onRename={ handleRename }
                            onReset={ handleResetName }
                        />
                    </SpacePanel>

                    <Separator className="h-1" />

                    <SpacePanel defaultSize="15" title="Сохранение шаблона">
                        <TemplateSaveForm />
                    </SpacePanel>
                </Group>
            </Panel>
        </Group>
    );
};
