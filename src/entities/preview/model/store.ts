import { create } from 'zustand';
import { PipelineContext } from '@/features/run-extraction/lib/pipeline/core';
import { LAYER_REGISTRY } from '@/features/run-extraction/lib/pipeline/registry';
import { PipelineLayer } from '@/entities/pattern/model/types';
import { createInitialContext } from '@/features/run-extraction/lib/context-builder';
import { ExtractionParams } from '@/features/run-extraction/lib/pipeline/core';

interface PreviewState {
  cache: Record<string, PipelineContext>;
  activePreviewId: string | null;
  isExecuting: boolean;

  runUpToLayer: (targetInstanceId: string, pipeline: PipelineLayer[], params: ExtractionParams) => void;
  invalidateFromIndex: (index: number, pipeline: PipelineLayer[]) => void;
  clearCache: () => void;
  setActivePreview: (id: string | null) => void;
}

export const usePreviewStore = create<PreviewState>((set, get) => ({
  cache: {},
  activePreviewId: null,
  isExecuting: false,

  runUpToLayer: (targetInstanceId, pipeline, params) => {
    set({ isExecuting: true });

    // Даем UI время отрисовать состояние загрузки (isExecuting)
    setTimeout(() => {
      const { cache } = get();
      const newCache = { ...cache };
      let currentContext = createInitialContext(params);

      for (let i = 0; i < pipeline.length; i++) {
        const layer = pipeline[i];
        
        // Если есть в кеше - берем из кеша
        if (newCache[layer.instanceId]) {
          currentContext = newCache[layer.instanceId];
        } else {
          // Иначе выполняем слой
          const metadata = LAYER_REGISTRY[layer.id];
          if (metadata) {
            try {
              currentContext = metadata.layer({ ...currentContext, settings: layer.settings });
              newCache[layer.instanceId] = currentContext;
            } catch (error) {
              console.error(`Error executing layer ${layer.id}:`, error);
              break; // Прерываем при ошибке
            }
          }
        }

        if (layer.instanceId === targetInstanceId) {
          break; // Дошли до целевого слоя
        }
      }

      set({ cache: newCache, activePreviewId: targetInstanceId, isExecuting: false });
    }, 10); // Микро-задержка для event loop
  },

  invalidateFromIndex: (index, pipeline) => set((state) => {
    const newCache = { ...state.cache };
    // Удаляем из кеша этот слой и все последующие
    for (let i = index; i < pipeline.length; i++) {
      const layerId = pipeline[i]?.instanceId;
      if (layerId) delete newCache[layerId];
    }
    
    // Если активный превью был сброшен, скрываем его
    const isActiveInvalidated = !newCache[state.activePreviewId || ''];

    return { 
      cache: newCache,
      activePreviewId: isActiveInvalidated ? null : state.activePreviewId
    };
  }),

  clearCache: () => set({ cache: {}, activePreviewId: null }),
  setActivePreview: (id) => set({ activePreviewId: id }),
}));