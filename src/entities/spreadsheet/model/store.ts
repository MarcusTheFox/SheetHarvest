import { create } from 'zustand';

/**
 * Интерфейс диапазона объединения ячеек.
 * s (start) — координаты левой верхней ячейки (row, col)
 * e (end) — координаты правой нижней ячейки (row, col)
 */
export interface MergeRange {
  s: { r: number; c: number };
  e: { r: number; c: number };
}

/**
 * Интерфейс отдельного листа таблицы.
 */
export interface Sheet {
  name: string;
  data: any[][];      // Двумерный массив данных (строки -> ячейки)
  merges: MergeRange[]; // Список объединенных диапазонов
}

/**
 * Интерфейс состояния хранилища таблиц.
 */
interface SpreadsheetState {
  // Данные
  sheets: Sheet[];
  currentSheetIndex: number;

  // Геттеры (вычисляемые свойства для удобства)
  getCurrentSheet: () => Sheet | null;

  // Действия (Actions)
  /** Заменяет текущий набор листов новыми данными и сбрасывает индекс */
  setSheets: (sheets: Sheet[]) => void;
  
  /** Переключает активный лист по индексу */
  setCurrentSheet: (index: number) => void;
  
  /** Полностью очищает состояние хранилища */
  reset: () => void;
}

/**
 * Глобальный стор для управления данными загруженной таблицы.
 * Использует Zustand для реактивного обновления UI.
 */
export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  // Изначальное состояние
  sheets: [],
  currentSheetIndex: 0,

  // Реализация геттера
  getCurrentSheet: () => {
    const { sheets, currentSheetIndex } = get();
    return sheets.length > 0 ? sheets[currentSheetIndex] : null;
  },

  // Реализация действий
  setSheets: (sheets) => set({ 
    sheets, 
    currentSheetIndex: 0 
  }),

  setCurrentSheet: (index) => set((state) => ({ 
    currentSheetIndex: Math.min(Math.max(0, index), state.sheets.length - 1) 
  })),

  reset: () => set({ 
    sheets: [], 
    currentSheetIndex: 0 
  }),
}));