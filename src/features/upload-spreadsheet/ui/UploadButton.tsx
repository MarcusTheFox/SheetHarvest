"use client";

import { Button } from "@heroui/react";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { parseSpreadsheet } from "@/shared/lib/file-parser";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";

export const UploadButton = () => {
    const fileInputRef = useRef<HTMLInputElement>( null );
    const setSheets = useSpreadsheetStore(( state ) => state.setSheets );
    const setFile = useSpreadsheetStore(( state ) => state.setFile );

    const handleFileChange = async ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0];
        if ( file ) {
            setFile( file );
            const parsedData = await parseSpreadsheet( file );
            setSheets( parsedData );
        }
    };

    return (
        <>
            <input
                ref={ fileInputRef }
                accept=".xlsx, .xls, .csv"
                className="hidden"
                type="file"
                onChange={ handleFileChange }
            />

            <Button
                className="shrink-0"
                color="primary"
                startContent={ <Upload size={ 18 } /> }
                variant="flat"
                onPress={ () => fileInputRef.current?.click() }
            >
                Загрузить таблицу
            </Button>
        </>
    );
};
