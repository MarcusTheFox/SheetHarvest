import { MergeRange } from "@/entities/spreadsheet/model/store";

export const getCellMergeInfo = (row: number, col: number, merges: MergeRange[]) => {
  // Ищем, входит ли текущая ячейка в какой-либо диапазон
  const range = merges.find(m => 
    row >= m.s.r && row <= m.e.r && 
    col >= m.s.c && col <= m.e.c
  );

  if (!range) return { isHidden: false, rowSpan: 1, colSpan: 1 };

  // Если это верхняя левая ячейка диапазона — показываем её с размахом
  if (range.s.r === row && range.s.c === col) {
    return {
      isHidden: false,
      rowSpan: range.e.r - range.s.r + 1,
      colSpan: range.e.c - range.s.c + 1
    };
  }

  // В остальных случаях ячейка должна быть скрыта, так как её место занято "главной" ячейкой
  return { isHidden: true, rowSpan: 1, colSpan: 1 };
};

export const isSecondaryMergeCell = (row: number, col: number, merges: any[]) => {
  const range = merges.find(m => 
    row >= m.s.r && row <= m.e.r && 
    col >= m.s.c && col <= m.e.c
  );

  if (!range) return false;

  // Если текущая колонка — это не начало диапазона, значит она "вторичная"
  return !(range.s.r === row && range.s.c === col);
};