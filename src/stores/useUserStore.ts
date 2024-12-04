import { create } from 'zustand';
import { UserType } from '@/types/user';

interface UserStoreType {
    user: UserType | null;
    setUser: (user: UserType) => void;
    deleteUser: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    deleteUser: () => set({ user: null })
}));
