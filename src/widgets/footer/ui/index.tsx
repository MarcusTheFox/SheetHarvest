import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store"
import clsx from "clsx";

export const PageFooter = () => {
    const filename = useSpreadsheetStore(s => s.file?.name);
    
    return (
        <footer className={clsx(
            "py-1.5 px-2 bg-default-800 flex",
            "text-xs text-white"
        )}>
            <div className="flex flex-row gap-2">
                {filename ?? "Файл не загружен"}
            </div>
        </footer>
    )
}