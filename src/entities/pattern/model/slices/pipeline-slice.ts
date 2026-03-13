import { StateCreator } from 'zustand';
import { PatternState } from '../types';
import { DEFAULT_PIPELINE } from '@/features/run-extraction/lib/pipeline/registry';

export const createPipelineSlice: StateCreator<PatternState, [], [], Pick<PatternState, 
  | 'pipeline' | 'addLayer' | 'removeLayer' | 'moveLayer' | 'updateLayerSettings'
>> = (set) => ({
  pipeline: DEFAULT_PIPELINE.map(id => ({
    id,
    instanceId: `${id}-${Math.random().toString(36).substr(2, 9)}`,
    settings: {}
  })),

  addLayer: (layerId) => set((state) => ({
    pipeline: [...state.pipeline, {
      id: layerId,
      instanceId: `${layerId}-${Math.random().toString(36).substr(2, 9)}`,
      settings: {}
    }]
  })),

  removeLayer: (index) => set((state) => ({
    pipeline: state.pipeline.filter((_, i) => i !== index)
  })),

  moveLayer: (fromIndex, toIndex) => set((state) => {
    const newPipeline = [...state.pipeline];
    const [movedItem] = newPipeline.splice(fromIndex, 1);
    newPipeline.splice(toIndex, 0, movedItem);
    return { pipeline: newPipeline };
  }),

  updateLayerSettings: (index, settings) => set((state) => {
    const newPipeline = [...state.pipeline];
    newPipeline[index] = { ...newPipeline[index], settings: { ...newPipeline[index].settings, ...settings } };
    return { pipeline: newPipeline };
  }),
});
