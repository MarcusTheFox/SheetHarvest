import { PipelineTable } from "@/shared/types/pipeline";
import { Card, CardBody } from "@heroui/card";
import clsx from "clsx";

interface ResultTableCardProps {
    table: PipelineTable;
    isSelected?: boolean;
    displayName?: string;
    onSelect?: ( id: string ) => void;
}

export const ResultTableCard = ({
    table,
    isSelected,
    displayName,
    onSelect,
}: ResultTableCardProps ) => {
    return (
        <Card
            key={ table.id }
            className={ clsx(
                "border",
                isSelected
                    ? "bg-slate-500 text-white"
                    : "border-slate-200 hover:bg-slate-200",
                "transition-all group shrink-0",
            ) }
            radius="sm"
            shadow="none"
        >
            <CardBody className="p-0">
                <div className="flex justify-between items-start gap-2">
                    <div
                        className={ clsx(
                            "flex-1 flex flex-row items-center justify-between cursor-pointer min-w-0 p-3",
                            "text-xs font-bold truncate transition-colors",
                        ) }
                        onClick={ () => onSelect?.( table.id ) }
                    >
                        <h4>{ displayName ?? table.name }</h4>

                        <p className={ clsx(
                            "font-mono",
                            isSelected
                                ? "text-slate-100"
                                : "text-slate-400",
                        ) }
                        >
                            { table.rows.length }
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
