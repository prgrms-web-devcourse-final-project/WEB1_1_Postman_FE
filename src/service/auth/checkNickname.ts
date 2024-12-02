import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type checkNicknameProps = {
    nickname: string;
};

type checkNicknameResponseDataType = {
    isDuplicated: boolean;
};

type checkNicknameResponse = ApiResponseType<checkNicknameResponseDataType>;

export async function checkNickname({
    nickname
}: checkNicknameProps): Promise<checkNicknameResponse> {
    const api = defaultApi();
    try {
        const response = await api.post('/auth/duplicate-check/nickname', {
            nickname
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
            throw error.response.data;
        }
        throw {
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: '서버와의 통신에 실패했습니다.'
        };
    }
}
