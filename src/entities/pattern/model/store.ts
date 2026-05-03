import { create } from 'zustand';
import { PatternState } from './types';
import { getInitialState } from './slices/initial-state';
import { usePreviewStore } from '@/entities/preview/model/store';
import { DEFAULT_PIPELINE, LAYER_REGISTRY } from '@/features/run-extraction/lib/pipeline/registry';

export const usePatternStore = create<PatternState>((set, get) => ({
  pipeline: DEFAULT_PIPELINE.map(id => ({
    id,
    instanceId: `${id}-${Math.random().toString(36).substr(2, 9)}`,
    settings: {}
  })),

  addLayer: (layerId) => set((state) => {
    // При добавлении слоя в конец, кеш старых слоев не страдает
    // Но очистим всё на всякий случай для простоты (или можно не чистить)
    usePreviewStore.getState().invalidateFromIndex(state.pipeline.length, state.pipeline);

    const metadata = LAYER_REGISTRY[layerId];
    return {
      pipeline: [...state.pipeline, {
        id: layerId,
        instanceId: `${layerId}-${Math.random().toString(36).substr(2, 9)}`,
        settings: metadata?.defaultSettings ? { ...metadata.defaultSettings } : {}
      }]
    }
  }),

  removeLayer: (index) => set((state) => {
    usePreviewStore.getState().invalidateFromIndex(index, state.pipeline);
    return { pipeline: state.pipeline.filter((_, i) => i !== index) };
  }),

  moveLayer: (fromIndex, toIndex) => set((state) => {
    // Инвалидируем начиная с наименьшего затронутого индекса
    const minIndex = Math.min(fromIndex, toIndex);
    usePreviewStore.getState().invalidateFromIndex(minIndex, state.pipeline);

    const newPipeline = [...state.pipeline];
    const [movedItem] = newPipeline.splice(fromIndex, 1);
    newPipeline.splice(toIndex, 0, movedItem);
    return { pipeline: newPipeline };
  }),

  updateLayerSettings: <T>(index: number, settings: Partial<T>) => set((state) => {
    usePreviewStore.getState().invalidateFromIndex(index, state.pipeline);

    const newPipeline = [...state.pipeline];
    newPipeline[index] = { ...newPipeline[index], settings: { ...(newPipeline[index].settings as T), ...settings } };
    return { pipeline: newPipeline };
  }),

  loadPattern: (config) => set((state) => {
    usePreviewStore.getState().clearCache();
    return {
      ...state,
      ...config,
      // Перегенерируем instanceId для слоев пайплайна, чтобы React не путался
      pipeline: config.pipeline.map(layer => ({
        ...layer,
        instanceId: `${layer.id}-${Math.random().toString(36).substr(2, 9)}`
      }))
    }
  }),

  resetPattern: () => set(getInitialState()),
}));