import { AxiosError } from 'axios';
import { LoginType } from '@/types/login';
import { defaultApi } from '@/service/api';
import { tokenStorage } from './tokenStorage';

type LoginProps = {
    email: string;
    password: string;
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
        }
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw {
                message: '서버와의 통신에 실패했습니다',
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR'
            };
        }
        throw {
            message: '로그인 중 오류가 발생했습니다',
            statusCode: 500,
            code: 'UNKNOWN_ERROR'
        };
    }
}
