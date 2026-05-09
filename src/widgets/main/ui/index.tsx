import { useExtractionStore } from "@/entities/extraction/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { ResultSpace } from "@/widgets/spreadsheet-view/ui/ResultSpace";
import { Workspace } from "@/widgets/spreadsheet-view/ui/Workspace";

const EmptyPage = () => (
    <div className="flex-1 self-center mx-auto max-w-300 h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-default-200 rounded-2xl bg-default-50/50">
        <p className="text-default-400 font-medium">Загрузите файл для создания паттерна</p>
    </div>
);

export const PageMain = () => {
    const hasData = useSpreadsheetStore(( state ) => state.sheets.length > 0 );
    const isExtracted = useExtractionStore(( state ) => state.isExtracted );

    const getPage = () => {
        if ( !hasData ) return <EmptyPage />;
        if ( !isExtracted ) return <Workspace />;
        return <ResultSpace />;
    };

    return (
        <main className="h-full flex gap-6 p-1">
            { getPage() }
        </main>
    );
};
