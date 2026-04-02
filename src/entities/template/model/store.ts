import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PatternTemplate } from './types';

interface TemplateState {
  templates: PatternTemplate[];
  addTemplate: (template: Omit<PatternTemplate, 'id' | 'createdAt'>) => void;
  removeTemplate: (id: string) => void;
  updateTemplate: (id: string, name: string) => void;
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      templates: [],
      
      addTemplate: (data) => set((state) => ({
        templates: [
          {
            ...data,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
          },
          ...state.templates,
        ],
      })),

      removeTemplate: (id) => set((state) => ({
        templates: state.templates.filter((t) => t.id !== id),
      })),

      updateTemplate: (id, name) => set((state) => ({
        templates: state.templates.map((t) => t.id === id ? { ...t, name } : t),
      })),
    }),
    {
      name: 'sheetharvest-templates', // Ключ в localStorage
    }
  )
);