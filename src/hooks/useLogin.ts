import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/hooks/useToastStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/auth/login';
import { LoginProps, LoginResponseType } from '@/types/login';
import { tokenStorage } from '@/service/auth/tokenStorage';
import { useUserInfo } from './useUserInfo';

export const useLogin = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { handleGetUserInfo } = useUserInfo();

    const mutation = useMutation({
        mutationFn: ({ email, password }: LoginProps) =>
            login({ email, password }),
        onSuccess: (response: LoginResponseType) => {
            addToast('로그인 되었습니다.', 'success');
            tokenStorage.setAccessToken(response.result.accessToken);
            handleGetUserInfo();
            navigate('/');

        },
        onError: (error) => {
            addToast(error.message, 'warning');
            console.error(error);
            throw error;
        }
    });

    return mutation;
};
