import { create } from 'zustand';
import { UserType } from '@/types/user';

interface UserStoreType {
    user: UserType | null;
    setUser: (user: UserType) => void;
    deleteUser: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
    user: {
        nickname: '꿈을 꾸는 가오리',
        email: 'test@email.com',
        profileImageUrl: 'testimg.jpg'
    },
    setUser: (user) => set({ user }),
    deleteUser: () => set({ user: null })
}));
