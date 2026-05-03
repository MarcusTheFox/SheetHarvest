import { create } from "zustand";

interface SelectedLayerState {
    selectedLayerIndex?: number;
    setSelectedLayerIndex: (index?: number) => void;
}

export const useSelectedLayerStore = create<SelectedLayerState>()((set) => ({
    selectedLayerIndex: undefined,
    setSelectedLayerIndex: (index) => set({ selectedLayerIndex: index }),
}));
