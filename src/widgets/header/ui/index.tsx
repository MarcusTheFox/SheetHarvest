import { useExtractionStore } from "@/entities/extraction/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { UploadButton } from "@/features/upload-spreadsheet/ui/UploadButton";
import { Button, ButtonGroup } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { TableProperties, X } from "lucide-react";

const Logo = () => (
    <div className="flex items-center gap-1">
        <TableProperties className="text-primary" size={ 32 } />
        <h1 className="text-2xl font-bold italic tracking-tight">SheetHarvest</h1>
    </div>
);

export const PageHeader = () => {
    const hasData = useSpreadsheetStore(( state ) => state.sheets.length > 0 );
    const isExtracted = useExtractionStore(( state ) => state.isExtracted );
    const clearResults = useExtractionStore(( state ) => state.clearResults );

    return (
        <header className="flex justify-between items-center p-2 border-b shrink-0">
            <div className="flex gap-4">
                <Logo />

                { /* <div>
                    <ButtonGroup variant="light">
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <Button size="sm" disableRipple className="min-w-0">Файл</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                itemClasses={{
                                    title: "text-xs"
                                }}
                            >
                                <DropdownItem key="create">Новый файл</DropdownItem>
                                <DropdownItem key="close">Закрыть файл</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                </div> */ }
            </div>

            <div className="flex flex-row gap-4 items-center">
                { !isExtracted && <UploadButton /> }

                { isExtracted && (
                    <Button
                        className="font-semibold"
                        color="danger"
                        startContent={ <X size={ 18 } /> }
                        variant="flat"
                        onPress={ clearResults }
                    >
                        Закрыть результаты
                    </Button>
                ) }

                { hasData && !isExtracted && <RunExtractionButton /> }
            </div>
        </header>
    );
};
