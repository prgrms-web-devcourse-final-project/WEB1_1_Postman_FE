import { create } from 'zustand';

interface selectedKeywordState {
    selectedKeywords: string[];
    setSelectedKeywords: (selectedKeywords: string[]) => void;
}

export const useSelectedKeywordStore = create<selectedKeywordState>((set) => ({
    selectedKeywords: [],
    setSelectedKeywords: (selectedKeywords) => set({ selectedKeywords })
}));
