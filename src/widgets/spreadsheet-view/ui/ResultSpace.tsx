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
    const { results, headers } = useExtractionStore();

    const [customNames, setCustomNames] = useState<Record<string, string>>({});
    const [selectedTableId, setSelectedTableId] = useState(results[0]?.id);

    const selectedTable = results.find(table => table.id === selectedTableId);

    const isEmpty = results.length === 0 || !selectedTable;

    const handleTableClick = (id: string) => {
        setSelectedTableId(id);
    };

    const handleRename = (id: string, newName: string) => {
        setCustomNames(prev => ({ ...prev, [id]: newName }));
    };

    const handleResetName = (id: string) => {
        setCustomNames(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    const resultTables = results.map((t) => {
        const isSelected = selectedTableId === t.id;
        const displayName = customNames[t.id] ?? t.name;

        return (
            <ResultTableCard
                key={t.id}
                table={t}
                isSelected={isSelected}
                displayName={displayName}
                onSelect={handleTableClick}
            />
        )
    })

    return (
        <Group orientation="horizontal" className="gap-0.5">
            <Panel defaultSize="20">
                <Group orientation="vertical">
                    <SpacePanel title="Таблицы" classNames={{ wrapper: "gap-1" }}>
                        {resultTables}
                    </SpacePanel>
                </Group>
            </Panel>
            <Separator className="w-1" />
            <Panel>
                <Group orientation="vertical">
                    <SpacePanel hideWrapper title={isEmpty
                        ? "Результат"
                        : `Просмотр: ${customNames[selectedTable.id] ?? selectedTable.name}`
                    }>
                        {!isEmpty && (
                            <SpreadsheetTable
                                tables={[selectedTable]}
                                headers={headers}
                            />
                        )}
                    </SpacePanel>
                </Group>
            </Panel>
            <Separator className="w-1" />
            <Panel defaultSize="20">
                <Group orientation="vertical" className="gap-0.5">
                    <SpacePanel title="Экспорт">
                        <ExportPanel
                            selectedTableId={selectedTableId}
                            customNames={customNames}
                            onRename={handleRename}
                            onReset={handleResetName}
                        />
                    </SpacePanel>
                    <Separator className="h-1" />
                    <SpacePanel defaultSize="25" title="Экспорт">
                        <TemplateSaveForm />
                    </SpacePanel>
                </Group>
            </Panel>
        </Group>
    );
};