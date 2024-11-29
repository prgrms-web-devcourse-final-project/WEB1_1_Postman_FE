import { create } from 'zustand';

interface HomeSheetState {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useHomeSheetStore = create<HomeSheetState>((set) => ({
    open: false,
    setOpen: (open) => set({ open })
}));
