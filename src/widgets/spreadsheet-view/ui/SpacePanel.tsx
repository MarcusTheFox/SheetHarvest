import { Card, CardBody, CardHeader } from "@heroui/card";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Panel, PanelProps } from "react-resizable-panels";

interface SpacePanelBodyClassNames {
    base?: string;
    header?: string;
    icon?: string;
    wrapper?: string;
}

interface SpacePanelProps extends PanelProps {
    title?: string;
    iconSize?: number;
    hideWrapper?: boolean;
    classNames?: SpacePanelBodyClassNames;
}

export const SpacePanel = ({
    children,
    title = "Панель",
    iconSize = 16,
    hideWrapper = false,
    classNames,
    ...props
}: SpacePanelProps) => {

    return (
        <Panel {...props}>
            <Card radius="sm" shadow="none" className={clsx(
                "h-full border border-slate-200",
                classNames?.base,
            )}>
                <CardHeader className={clsx(
                    "rounded-none bg-slate-200",
                    "text-[10px] font-extrabold text-slate-500 uppercase",
                    "py-2 flex items-center",
                    classNames?.header,
                )}>
                    <ChevronRight size={iconSize} className={clsx(
                        "text-slate-500",
                        classNames?.icon,
                    )} />
                    {title}
                </CardHeader>
                {hideWrapper ? (
                    children
                ) : (
                    <CardBody className={clsx(
                        "overflow-auto",
                        classNames?.wrapper,
                    )}>
                        {children}
                    </CardBody>
                )}
            </Card>
        </Panel>
    )
}