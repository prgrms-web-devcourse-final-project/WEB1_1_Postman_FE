import { AxiosError } from 'axios';
import { LoginType } from '@/types/login';
import { defaultApi } from '@/service/api';
import { tokenStorage } from './tokenStorage';

type LoginProps = {
    email: string;
    password: string;
};

type AuthError = {
    message: string;
    statusCode?: number;
    code?: string;
};

export async function login({
    email,
    password
}: LoginProps): Promise<LoginType> {
    const api = defaultApi();

    try {
        const response = await api.post('/auth/signin', { email, password });
        if (response.data.isSuccess) {
            tokenStorage.setAccessToken(response.data.result.accessToken);
            return response.data;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                const authError: AuthError = {
                    message: '존재하지 않는 사용자입니다.',
                    statusCode: error.response.status,
                    code: 'USER_NOT_FOUND'
                };
                throw authError;
            }
        }
        const unknownError: AuthError = {
            message: '로그인 중 오류가 발생했습니다.',
            statusCode: 500,
            code: 'UNKNOWN_ERROR'
        };
        throw unknownError;
    }
}
