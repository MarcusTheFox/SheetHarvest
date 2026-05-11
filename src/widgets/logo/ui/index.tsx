import { TableProperties } from "lucide-react";
import { ElementType } from "react";

interface LogoProps {
    suffix?: string;
    subtitle?: string;
    Icon?: ElementType;
}

export const Logo = ({
    suffix,
    subtitle,
    Icon = TableProperties,
}: LogoProps ) => {
    return (
        <div className="flex items-center gap-3 mr-4">
            <div className="bg-primary p-1.5 rounded-lg">
                <Icon className="text-white" size={ 18 } />
            </div>

            <div>
                <h1 className="text-sm font-black text-slate-800 tracking-tight leading-none uppercase">
                    Sheet
                    { }
                    <span className="text-primary">Harvest</span>
                    { " " }
                    { suffix }
                </h1>

                { subtitle
                    && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                        { subtitle }
                    </p> }
            </div>
        </div>
    );
};
