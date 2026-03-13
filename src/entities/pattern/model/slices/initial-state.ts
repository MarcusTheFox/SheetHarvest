import { DEFAULT_PIPELINE } from '@/features/run-extraction/lib/pipeline/registry';
import { ExtractionPattern } from '../types';

export const getInitialState = (): ExtractionPattern & { selectedColumns: number[] } => ({
  headerRowIndex: null,
  isManualMode: false,
  selectedColumns: [],
  customNames: {},
  constraints: [],
  topology: {},
  anchor: {
    start: null,
    end: null,
  },
  hiddenColumns: [],
  pipeline: DEFAULT_PIPELINE.map(id => ({
    id,
    instanceId: `${id}-${Math.random().toString(36).substr(2, 9)}`,
    settings: {}
  })),
});
