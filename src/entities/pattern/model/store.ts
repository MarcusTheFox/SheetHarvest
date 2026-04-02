import { create } from 'zustand';
import { PatternState } from './types';
import { createTableSlice } from './slices/table-slice';
import { createPipelineSlice } from './slices/pipeline-slice';
import { getInitialState } from './slices/initial-state';

export const usePatternStore = create<PatternState>((...args) => ({
  ...createTableSlice(...args),
  ...createPipelineSlice(...args),

  resetPattern: () => args[0](getInitialState()),
}));