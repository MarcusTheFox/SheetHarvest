import ExcelJS from 'exceljs';
import Papa from 'papaparse';

/**
 * Интерфейс диапазона объединения ячеек
 * s: start (верхний левый угол)
 * e: end (нижний правый угол)
 */
export interface MergeRange {
  s: { r: number; c: number }; // r: row index, c: column index
  e: { r: number; c: number };
}

/**
 * Интерфейс распарсенного листа
 */
export interface ParsedSheet {
  name: string;
  data: any[][];
  merges: MergeRange[];
}

/**
 * Основная функция парсинга табличных файлов (XLSX, XLS, CSV)
 */
export const parseSpreadsheet = async (file: File): Promise<ParsedSheet[]> => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  // --- ОБРАБОТКА CSV ---
  if (extension === 'csv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          resolve([
            {
              name: 'CSV Result',
              data: results.data as any[][],
              merges: [], // В CSV нет объединений
            },
          ]);
        },
        error: (error) => reject(error),
        skipEmptyLines: true,
      });
    });
  }

  // --- ОБРАБОТКА XLSX (ExcelJS) ---
  const workbook = new ExcelJS.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  
  try {
    await workbook.xlsx.load(arrayBuffer);
  } catch (err) {
    console.error('Ошибка загрузки XLSX:', err);
    throw new Error('Не удалось прочитать файл Excel. Возможно, он поврежден или имеет неподдерживаемый формат.');
  }

  const result: ParsedSheet[] = [];

  workbook.eachSheet((worksheet) => {
    const sheetData: any[][] = [];
    
    // 1. Извлекаем данные строк
    // Обратите внимание: exceljs использует нумерацию с 1
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      const rowValues = Array.isArray(row.values) 
        ? row.values.slice(1) // Индекс 0 у exceljs всегда пустой
        : [];
      
      // Обработка объектов (например, формул или гиперссылок)
      const cleanRow = rowValues.map(cell => {
        if (cell && typeof cell === 'object') {
          if ('result' in cell) return cell.result; // Для формул
          if ('text' in cell) return cell.text;     // Для гиперссылок
          return JSON.stringify(cell);
        }
        return cell;
      });

      sheetData.push(cleanRow);
    });

    // 2. Извлекаем объединения ячеек
    // exceljs хранит их в формате строковых диапазонов ["A1:C3", "E5:F5"]
    const merges: MergeRange[] = [];
    
    // Доступ к модели листа для получения списка объединений
    const rawMerges = (worksheet.model as any).merges || [];
    
    rawMerges.forEach((rangeStr: string) => {
      const [startAddr, endAddr] = rangeStr.split(':');
      if (startAddr && endAddr) {
        const startCell = worksheet.getCell(startAddr);
        const endCell = worksheet.getCell(endAddr);

        merges.push({
          s: { r: Number(startCell.row) - 1, c: Number(startCell.col) - 1 },
          e: { r: Number(endCell.row) - 1, c: Number(endCell.col) - 1 },
        });
      }
    });

    result.push({
      name: worksheet.name,
      data: sheetData,
      merges,
    });
  });

  return result;
};