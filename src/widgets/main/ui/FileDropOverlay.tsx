"use client";

import { useEffect, useState } from "react";
import { FileUp } from "lucide-react";
import { useFileImport } from "@/features/upload-spreadsheet/lib/useFileImport";

export const FileDropOverlay = () => {
    const [ isDragging, setIsDragging ] = useState( false );
    const { importFile } = useFileImport();

    useEffect(() => {
        const handleDragOver = ( e: DragEvent ) => {
            e.preventDefault();
            e.stopPropagation();
            if ( e.dataTransfer?.types.includes( "Files" )) {
                setIsDragging( true );
            }
        };

        const handleDragLeave = ( e: DragEvent ) => {
            e.preventDefault();
            e.stopPropagation();
            // Проверка, что мы действительно вышли за пределы окна
            if ( e.relatedTarget === null ) {
                setIsDragging( false );
            }
        };

        const handleDrop = async ( e: DragEvent ) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging( false );

            const file = e.dataTransfer?.files?.[0];
            if ( file ) {
                await importFile( file );
            }
        };

        window.addEventListener( "dragover", handleDragOver );
        window.addEventListener( "dragleave", handleDragLeave );
        window.addEventListener( "drop", handleDrop );

        return () => {
            window.removeEventListener( "dragover", handleDragOver );
            window.removeEventListener( "dragleave", handleDragLeave );
            window.removeEventListener( "drop", handleDrop );
        };
    }, [ importFile ]);

    if ( !isDragging ) return null;

    return (
        <div className="fixed inset-0 z-200 bg-primary/10 backdrop-blur-[2px] flex items-center justify-center p-8 pointer-events-none">
            <div className="w-full h-full border-4 border-dashed border-primary rounded-3xl flex flex-col items-center justify-center gap-4 bg-white/80 animate-in zoom-in-95 duration-200">
                <div className="bg-primary p-6 rounded-full shadow-2xl shadow-primary/40 animate-bounce">
                    <FileUp className="text-white" size={ 48 } />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Отпустите для загрузки</h2>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">XLSX, XLS или CSV</p>
                </div>
            </div>
        </div>
    );
};
