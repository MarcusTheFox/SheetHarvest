import { Separator as ResizableSeparator } from "react-resizable-panels";

export const Separator = ({ className }: { className: string }) => (
    <ResizableSeparator className={`
        rounded bg-slate-300
        data-[separator='hover']:bg-slate-400
        data-[separator='active']:bg-slate-500
        transition-background
        ${className}
    `} />
)