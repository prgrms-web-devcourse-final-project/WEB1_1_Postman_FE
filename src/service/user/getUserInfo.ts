import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';
import { UserType } from '@/types/user';
import { ApiResponseType } from '@/types/apiResponse';

type getUserInfoResponseType = ApiResponseType<UserType | null>;

export async function getUserInfo(): Promise<getUserInfoResponseType> {
    const api = defaultApi();
    console.log('유저 정보 가져오기');
    try {
        const response = await api.get('/user');
        console.log(response);
        return response.data.result;
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
