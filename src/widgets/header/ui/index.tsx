"use client";

import {
    Button, Divider,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";
import { FileUp, FileX2, X } from "lucide-react";
import { useRef } from "react";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSelectedLayerStore } from "@/widgets/spreadsheet-view/model/useSelectedLayerStore";
import { RunExtractionButton } from "@/features/run-extraction/ui/RunExtractionButton";
import { Logo } from "@/widgets/logo/ui";
import { useFileImport } from "@/features/upload-spreadsheet/lib/useFileImport";

export const PageHeader = () => {
    const fileInputRef = useRef<HTMLInputElement>( null );

    const resetSpreadsheet = useSpreadsheetStore(( s ) => s.reset );
    const isExtracted = useExtractionStore(( s ) => s.isExtracted );
    const clearResults = useExtractionStore(( s ) => s.clearResults );
    
    const resetPattern = usePatternStore(( s ) => s.resetPattern );
    const setSelectedLayerIndex = useSelectedLayerStore(( s ) => s.setSelectedLayerIndex );
    const hasData = useSpreadsheetStore(( s ) => s.sheets.length > 0 );

    const { importFile } = useFileImport();

    const handleFileOpen = async ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0];
        if ( file ) {
            await importFile(file);
        }
    };

    const handleCloseFile = () => {
        resetSpreadsheet();
        resetPattern();
        clearResults();
        setSelectedLayerIndex( undefined );

        if ( fileInputRef.current ) fileInputRef.current.value = "";
    };

    const menuBtnClass = "h-7 px-2 text-[10px] font-bold text-slate-600 uppercase data-[hover=true]:bg-slate-100";
    const dropdownItemClass = {
        base: "py-2",
        title: "text-[10px] font-bold uppercase tracking-wider",
    };

    return (
        <header className="flex justify-between items-center h-12 px-6 border-b border-slate-200 bg-white shrink-0">
            <input
                ref={ fileInputRef }
                accept=".xlsx,.xls,.csv"
                className="hidden"
                type="file"
                onChange={ handleFileOpen }
            />

            <div className="flex items-center">
                <Logo />
                <Divider className="h-4 bg-slate-200 mx-2" orientation="vertical" />

                <div className="flex gap-1">
                    <Dropdown className="min-w-[180px] rounded-md shadow-xl border border-slate-100" placement="bottom-start">
                        <DropdownTrigger>
                            <Button className={ menuBtnClass } size="sm" variant="light">
                                Файл
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="File Actions" itemClasses={ dropdownItemClass } variant="flat">
                            <DropdownItem
                                key="open"
                                startContent={ <FileUp size={ 14 } /> }
                                onPress={ () => fileInputRef.current?.click() }
                            >
                                Открыть файл
                            </DropdownItem>

                            <DropdownItem
                                key="close"
                                className="text-danger"
                                color="danger"
                                isDisabled={ !hasData }
                                startContent={ <FileX2 size={ 14 } /> }
                                onPress={ handleCloseFile }
                            >
                                Закрыть файл
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            <div className="flex items-center gap-2">
                { isExtracted
                    ? (
                        <Button
                            className="h-8 px-4 text-[10px] font-bold uppercase tracking-widest bg-danger-50 text-danger hover:bg-danger-100"
                            radius="sm"
                            startContent={ <X size={ 14 } strokeWidth={ 3 } /> }
                            onPress={ clearResults }
                        >
                            Закрыть результаты
                        </Button>
                    )
                    : (
                        hasData && <RunExtractionButton />
                    ) }
            </div>
        </header>
    );
};
