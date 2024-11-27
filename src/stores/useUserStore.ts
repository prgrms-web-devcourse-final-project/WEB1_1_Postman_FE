import { create } from 'zustand';

// 임시 유저 타입
type UserType = {
    nickname: string;
    email: string;
    profileImageUrl: string;
};

interface UserStoreType {
    user: UserType;
    setUser: (user: UserType) => void;
    deleteUser: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    deleteUser: () => set({ user: null })
}));
