import { create } from 'zustand';

type Letter = {
    id: number;
    longitude: number;
    latitude: number;
    title: string;
    keyword: string;
    date: string;
};

type SelectedLetter = {
    selectedLetter: Letter | null;
    setSelectedLetter: (letter: Letter) => void;
    toggleSelectedLetter: (letter: Letter) => void;
    clearSelectedLetter: () => void;
};

export const useSelectedLetterStore = create<SelectedLetter>((set) => ({
    selectedLetter: null,
    setSelectedLetter: (letter) => set({ selectedLetter: letter }),
    toggleSelectedLetter: (letter) =>
        set((state) =>
            state.selectedLetter?.id === letter.id
                ? { selectedLetter: null }
                : { selectedLetter: letter }
        ),
    clearSelectedLetter: () => set({ selectedLetter: null })
}));
