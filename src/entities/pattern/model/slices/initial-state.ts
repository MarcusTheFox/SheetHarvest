import { DEFAULT_PIPELINE, LAYER_REGISTRY } from '@/features/run-extraction/lib/pipeline/registry';
import { ExtractionPattern } from '../types';

export const getInitialState = (): ExtractionPattern & { selectedColumns: number[] } => ({
  headerRowIndex: null,
  isManualMode: false,
  selectedColumns: [],
  customNames: {},
  hiddenColumns: [],

  pipeline: DEFAULT_PIPELINE.map(id => {
    const metadata = LAYER_REGISTRY[id];
    return {
      id,
      instanceId: `${id}-${Math.random().toString(36).substr(2, 9)}`,
      settings: metadata.defaultSettings ? { ...metadata.defaultSettings } : {}
    }
  }),
});
