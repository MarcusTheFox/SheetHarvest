import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";
import { useExtractionStore } from "@/entities/extraction/model/store";
import { usePatternStore } from "@/entities/pattern/model/store";
import { useSelectedLayerStore } from "@/widgets/spreadsheet-view/model/useSelectedLayerStore";
import { parseSpreadsheet } from "@/shared/lib/file-parser";

export const useFileImport = () => {
    const setSheets = useSpreadsheetStore((s) => s.setSheets);
    const setFile = useSpreadsheetStore((s) => s.setFile);
    const resetPattern = usePatternStore((s) => s.resetPattern);
    const clearResults = useExtractionStore((s) => s.clearResults);
    const setSelectedLayerIndex = useSelectedLayerStore((s) => s.setSelectedLayerIndex);

    const importFile = async (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!['xlsx', 'xls', 'csv'].includes(extension || '')) {
            alert("Неподдерживаемый формат файла");
            return;
        }

        setFile(file);
        const parsedData = await parseSpreadsheet(file);
        setSheets(parsedData);
        
        setSelectedLayerIndex(undefined);
        resetPattern();
        clearResults();
    };

    return { importFile };
};