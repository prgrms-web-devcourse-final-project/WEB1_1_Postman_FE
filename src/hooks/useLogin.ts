import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';
import { useToastStore } from '@/hooks/useToastStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/auth/login';
import { getUserInfo } from '@/service/user/getUserInfo';
import { LoginProps, LoginResponseType } from '@/types/login';
import { tokenStorage } from '@/service/auth/tokenStorage';

export const useLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { addToast } = useToastStore();

    const handleGetUserInfo = async (email: string) => {
        const userInfoResponse = await getUserInfo();
        if (!userInfoResponse) {
            addToast('유저 정보를 불러오지 못했습니다.', 'warning');
            return false;
        }
        const userInfoWithEmail = {
            nickname: userInfoResponse.nickname || '알 수 없음',
            profileImageUrl: userInfoResponse.profileImageUrl || 'testimg.jpg',
            email: email
        };
        setUser(userInfoWithEmail);
        return true;
    };

    const mutation = useMutation({
        mutationFn: ({ email, password }: LoginProps) =>
            login({ email, password }),
        onSuccess: (response: LoginResponseType, { email }) => {
            if (response.data.isSuccess) {
                addToast('로그인 되었습니다.', 'success');
                tokenStorage.setAccessToken(response.data.result.accessToken);
                handleGetUserInfo(email);
                navigate('/');
            } else {
                addToast(response.data.message, 'success');
            }
        },
        onError: (error) => {
            addToast(error.message, 'warning');
            throw error;
        }
    });

    return mutation;
};
