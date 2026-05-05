import { create } from 'zustand';
import { PipelineContext, PipelineTable } from '@/features/run-extraction/lib/pipeline/core';
import { LAYER_REGISTRY } from '@/features/run-extraction/lib/pipeline/registry';
import { PipelineLayer } from '@/entities/pattern/model/types';
import { createInitialContext } from '@/features/run-extraction/lib/context-builder';

interface PreviewState {
  cache: Record<string, PipelineContext>;
  activePreviewId: string | null;
  isExecuting: boolean;
  executingLayerId?: string;
  executingIndex: number;
  targetIndex: number;

  runUpToLayer: (targetInstanceId: string, pipeline: PipelineLayer[], sourceTables: PipelineTable[]) => void;
  addCacheContext: (layerInstanceId: string, context: PipelineContext) => void,
  invalidateFromIndex: (index: number, pipeline: PipelineLayer[]) => void;
  clearCache: () => void;
  setActivePreview: (id: string | null) => void;

  setIsExecuting: (value: boolean) => void;
  setExecutingLayerId: (value?: string) => void;
  setExecutingIndex: (value: number) => void;
  setTargetIndex: (value: number) => void;
}

export const usePreviewStore = create<PreviewState>((set, get) => ({
  cache: {},
  activePreviewId: null,
  isExecuting: false,
  executingLayerId: "",
  executingIndex: -1,
  targetIndex: -1,

  setIsExecuting: (value: boolean) => set({ isExecuting: value }),
  setExecutingLayerId: (value?: string) => set({ executingLayerId: value }),
  setExecutingIndex: (value: number) => set({ executingIndex: value }),
  setTargetIndex: (value: number) => set({ targetIndex: value }),

  runUpToLayer: async (targetInstanceId: string, pipeline: PipelineLayer[], sourceTables: PipelineTable[]) => {
    const state = get();
    const targetIndex = pipeline.findIndex(layer => layer.instanceId === targetInstanceId);
    
    if (state.isExecuting || pipeline.length === 0) return;
    
    const firstLayerId = pipeline[0].instanceId;
    
    if (!firstLayerId) return;

    set({
      isExecuting: true,
      targetIndex: targetIndex,
    });

    let currentContext = state.cache[firstLayerId]
      ? state.cache[firstLayerId]
      : createInitialContext(sourceTables)

    for (let i = 0; i < pipeline.length; i++) {
      const layer = pipeline[i];

      if (state.cache[layer.instanceId]) {
        currentContext = state.cache[layer.instanceId];
      } else {
        const metadata = LAYER_REGISTRY[layer.id];
        if (metadata) {
          set({
            executingLayerId: layer.instanceId,
            executingIndex: i,
          });

          currentContext = await (
            async () => {
              return metadata.layer({ ...currentContext }, layer.settings)
            }
          )();

          state.addCacheContext(layer.instanceId, currentContext);
        }
      }

      if (layer.instanceId === targetInstanceId) {
        break;
      }
    }

    set({
      isExecuting: false,
      executingLayerId: undefined,
      executingIndex: -1,
      targetIndex: -1,
    });
  },

  addCacheContext: (layerInstanceId: string, context: PipelineContext) => set((state) => {
    return {
      cache: {
        ...state.cache,
        [layerInstanceId]: context,
      }
    }
  }),

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