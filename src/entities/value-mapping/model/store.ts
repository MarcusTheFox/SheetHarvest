import { create } from 'zustand';
import { IndexedDbMappingStorage, IMappingStorage } from './storage';

interface MappingState {
    mappings: Record<string, string>;
    isLoaded: boolean;
    storage: IMappingStorage;
    
    // Actions
    loadMappings: () => Promise<void>;
    addMapping: (original: string, replacement: string) => Promise<void>;
    removeMapping: (original: string) => Promise<void>;
}

export const useMappingStore = create<MappingState>()((set, get) => ({
    mappings: {},
    isLoaded: false,
    storage: new IndexedDbMappingStorage(), // Инъекция зависимости по умолчанию

    loadMappings: async () => {
        const { storage, isLoaded } = get();
        if (isLoaded) return; // Уже загружено

        try {
            const mappings = await storage.getAllMappings();
            set({ mappings, isLoaded: true });
        } catch (error) {
            console.error("Ошибка при загрузке словарей сопоставлений:", error);
        }
    },

    addMapping: async (original: string, replacement: string) => {
        const { storage, mappings } = get();
        
        // Оптимистичное обновление стора
        set({ mappings: { ...mappings, [original]: replacement } });
        
        try {
            await storage.saveMapping(original, replacement);
        } catch (error) {
            console.error("Ошибка при сохранении сопоставления:", error);
            // Откат стейта в случае ошибки (опционально)
            const newMappings = { ...mappings };
            delete newMappings[original];
            set({ mappings: newMappings });
        }
    },

    removeMapping: async (original: string) => {
        const { storage, mappings } = get();
        const newMappings = { ...mappings };
        delete newMappings[original];
        
        set({ mappings: newMappings });

        try {
            await storage.removeMapping(original);
        } catch (error) {
            console.error("Ошибка при удалении сопоставления:", error);
            // Откат
            set({ mappings });
        }
    }
}));
