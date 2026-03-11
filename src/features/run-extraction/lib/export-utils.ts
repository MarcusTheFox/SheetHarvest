import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const defaultFileName = 'extraction_results';

export const exportToExcel = (headers: string[], data: any[][], fileName: string = defaultFileName + '.xlsx') => {
    const worksheetData = [headers, ...data];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, fileName);
};

export const exportToCSV = (headers: string[], data: any[][], fileName: string = defaultFileName + '.csv') => {
    const csv = Papa.unparse({
        fields: headers,
        data: data
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const exportToJSON = (headers: string[], data: any[][], fileName: string = defaultFileName + '.json') => {
    const jsonData = data.map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
