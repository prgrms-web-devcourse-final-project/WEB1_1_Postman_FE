import { create } from 'zustand';

type Letter = {
    letterId: number;
    latitude: number;
    longitude: number;
    title: string;
    createdAt: string;
    distance: number;
    target: number;
    createUserNickname: string;
    label: string;
    description: string;
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
            state.selectedLetter?.letterId === letter.letterId
                ? { selectedLetter: null }
                : { selectedLetter: letter }
        ),
    clearSelectedLetter: () => set({ selectedLetter: null })
}));
