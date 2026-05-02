import { useExtractionStore } from "@/entities/extraction/model/store";
import { Card, CardBody, CardHeader } from "@heroui/card";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Group, Panel } from "react-resizable-panels";
import { SpreadsheetTable } from "./SpreadsheetTable";
import { Separator } from "@/shared/ui/Separator";
import { useState } from "react";

export const ResultSpace = () => {
    const { results, headers } = useExtractionStore();

    const [selectedTableId, setSelectedTableId] = useState(results[0]?.id);

    const selectedTable = results.find(table => table.id === selectedTableId);
    
    const isEmpty = results.length === 0 || !selectedTable;

    const handleTableClick = (id: string) => {
        setSelectedTableId(id);
    };

    const resultTables = results.map((t) => {
        const isSelected = selectedTableId === t.id;

        return (
            <Card
                key={t.id}
                shadow="none"
                radius="sm"
                className={
                    clsx(
                        "border",
                        isSelected
                            ? "bg-slate-500 text-white"
                            : "border-slate-200 hover:bg-slate-200",
                        "transition-all group shrink-0",
                    )
                }
            >
                <CardBody className="p-0">
                    <div className="flex justify-between items-start gap-2">
                        <div
                            className={
                                clsx(
                                    "flex-1 flex flex-row items-center justify-between cursor-pointer min-w-0 p-3",
                                    "text-xs font-bold truncate transition-colors",
                                )
                            }
                            onClick={() => handleTableClick(t.id)}
                        >
                            <h4>
                                {t.name}
                            </h4>
                            <p>
                                {t.rows.length}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    })

    return (
        <Group orientation="horizontal" className="gap-0.5">
            <Panel collapsible minSize="10" defaultSize="20">
                <Group orientation="vertical">
                    <Panel minSize={32}>
                        <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                            <CardHeader className={clsx(
                                "rounded-none bg-slate-200",
                                "text-[10px] font-extrabold text-slate-500 uppercase",
                                "py-2 flex items-center",
                            )}>
                                <ChevronRight size={16} className="text-slate-500" />
                                Таблицы
                            </CardHeader>
                            <CardBody className="overflow-auto gap-2">
                                {resultTables}
                            </CardBody>
                        </Card>
                    </Panel>
                </Group>
            </Panel>
            <Separator className="w-1" />
            <Panel>
                <Group orientation="vertical">
                    <Panel>
                        <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                            <CardHeader className={clsx(
                                "rounded-none bg-slate-200",
                                "text-[10px] font-extrabold text-slate-500 uppercase",
                                "py-2 flex items-center",
                            )}>
                                <ChevronRight size={16} className="text-slate-500" />
                                {isEmpty || !selectedTable
                                    ? <p>Результат</p>
                                    : <p>Таблица: {selectedTable.name}</p>
                                }
                            </CardHeader>
                            {!isEmpty && selectedTable &&
                                <SpreadsheetTable
                                    tables={[selectedTable]}
                                    headers={headers}
                                />
                            }
                        </Card>
                    </Panel>
                </Group>
            </Panel>
            <Separator className="w-1" />
            <Panel minSize="20" defaultSize="20">
                <Group orientation="vertical">
                    <Panel>
                        <Card radius="sm" shadow="none" className="h-full border border-slate-200">
                            <CardHeader className={clsx(
                                "rounded-none bg-slate-200",
                                "text-[10px] font-extrabold text-slate-500 uppercase",
                                "py-2 flex items-center",
                            )}>
                                <ChevronRight size={16} className="text-slate-500" />
                                Экспорт
                            </CardHeader>
                            <CardBody className="overflow-auto">
                            </CardBody>
                        </Card>
                    </Panel>
                </Group>
            </Panel>
        </Group>
    );
};