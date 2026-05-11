import { useExtractionStore } from "@/entities/extraction/model/store";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { ResultSpace } from "@/widgets/spreadsheet-view/ui/ResultSpace";
import { Workspace } from "@/widgets/spreadsheet-view/ui/Workspace";
import { EmptyPage } from "./EmptyPage";

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
