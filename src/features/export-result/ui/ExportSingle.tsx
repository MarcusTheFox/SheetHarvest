import { Button } from "@heroui/button";
import clsx from "clsx";

interface ExportSingleProps {
    label: string;
    onClick?: () => void;
}

export const ExportSingle = ({ label, onClick }: ExportSingleProps ) => (
    <Button
        className={ clsx(
            "flex-1",
            "bg-white border border-slate-200",
            "hover:border-blue-500 hover:text-blue-600",
            "transition-all py-2.5",
            "text-xs font-bold uppercase tracking-tighter text-slate-600",
        ) }
        radius="sm"
        onPress={ onClick }
    >
        { label }
    </Button>
);
