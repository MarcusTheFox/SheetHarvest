import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { CellValue } from 'exceljs';

export interface ExcelSheet {
    name: string;
    rows: CellValue[][];
}

/**
 * Экспорт в Excel (поддержка нескольких листов)
 */
export const exportToExcel = (sheets: ExcelSheet[], fileName: string = "export") => {
    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
        const worksheet = XLSX.utils.aoa_to_sheet(sheet.rows);
        // Excel не любит слишком длинные имена листов и спецсимволы
        const safeName = sheet.name.replace(/[\[\]\?\*\/\\\:]/g, "").substring(0, 31);
        XLSX.utils.book_append_sheet(workbook, worksheet, safeName || "Sheet");
    });

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

/**
 * Экспорт в CSV (одна таблица)
 */
export const exportToCSV = (data: any[][], headers: string[], fileName: string = "export") => {
    const csv = Papa.unparse({
        fields: headers,
        data: data
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    downloadFile(blob, `${fileName}.csv`);
};

/**
 * Экспорт в JSON
 */
export const exportToJSON = (data: any, fileName: string = "export") => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadFile(blob, `${fileName}.json`);
};

/**
 * Вспомогательная функция для скачивания файла в браузере
 */
const downloadFile = (blob: Blob, fileName: string) => {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};