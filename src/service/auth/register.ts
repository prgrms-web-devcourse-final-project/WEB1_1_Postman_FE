import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';

type registerProps = {
    email: string;
    password: string;
    nickname: string;
};

type registerResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
};

export async function register({
    email,
    password,
    nickname
}: registerProps): Promise<registerResponse> {
    const api = defaultApi();

    try {
        const response = await api.post('/auth/signup', {
            email,
            password,
            nickname
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw error.response;
        }
        throw {
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: '서버와의 통신에 실패했습니다.'
        };
    }
}
