import { useToastStore } from '@/hooks/useToastStore';
import { useUserStore } from './../stores/useUserStore';
import { getUserInfo } from '@/service/user/getUserInfo';
import { logout } from './../service/auth/logout';

export const useUserInfo = () => {
    const { setUser } = useUserStore();
    const { addToast } = useToastStore();

    const handleGetUserInfo = async () => {
        const userInfoResponse = await getUserInfo();

        if (!userInfoResponse) {
            addToast('유저 정보를 불러오지 못했습니다.', 'warning');
            logout();
            return false;
        }
        const userInfo = {
            nickname: userInfoResponse.nickname || '알 수 없음',
            profileImageUrl: userInfoResponse.profileImageUrl || 'testimg.jpg',
            email: userInfoResponse.email || '알 수 없음'
        };
        setUser(userInfo);
        return true;
    };

    return { handleGetUserInfo };
};
