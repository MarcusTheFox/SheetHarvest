import { TableProperties } from "lucide-react"

export const Logo = () => {
    return (
        <div className="flex items-center gap-2 mr-4">
            <div className="bg-primary p-1 rounded shadow-sm">
                <TableProperties className="text-white" size={16} />
            </div>
            <h1 className="text-xs font-black text-slate-800 tracking-tighter uppercase">
                Sheet<span className="text-primary">Harvest</span>
            </h1>
        </div>
    )
}